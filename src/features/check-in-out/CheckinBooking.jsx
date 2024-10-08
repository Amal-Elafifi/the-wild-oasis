import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const {checkin, isCheckingin} = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false); 
  const[addBreakfast, setAddBreakfast] = useState(false);
  const {settings, isLoading: isUpdatingPrice } = useSettings()
  // console.log(breakfastPrice);

  useEffect(()=>{
    setConfirmPaid(booking?.isPaid?? false)

  }, [booking])
  
  if(isLoading || isUpdatingPrice) return <spinner/>;
  
  const {
    id: bookingId,
    guests,
    // isPaid,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;
  
  function handleCheckin() {
    if(!confirmPaid) return;
    if(addBreakfast){
      checkin(bookingId, {
        hasBreakfast: true, 
        extraPrice: optionalBreakfastPrice ,
        totalPrice: totalPrice + optionalBreakfastPrice
      })
    }else{
      checkin({bookingId});

    }
  }
  


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && ( <Box>
        <Checkbox checked={addBreakfast}  onChange={()=>{
         setAddBreakfast(paid => !paid)
         setConfirmPaid(false)
        }}
        id="breakfast"
        >
          Add the price of {formatCurrency(optionalBreakfastPrice)} for the breakfast
        </Checkbox>
      </Box>)
      }
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={()=> setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingin}
          id="confirm"
        >
          I Confirm that {guests.fullName} has paid the total amount of{""}
          {!addBreakfast? formatCurrency(totalPrice):
                          `${formatCurrency(totalPrice + optionalBreakfastPrice)}
                          (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
