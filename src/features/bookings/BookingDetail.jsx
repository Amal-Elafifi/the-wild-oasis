import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking(); 
  const  {isDeleting, deleteBooking} = useDeleteBooking(); 
  const {checkOut, isCheckingOut} = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate()

  if(isLoading)return <Spinner/>;

  const {id: bookingId, status} = booking? booking: console.log("booking not fetched");
  
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status? status.replace("-", " "): null}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash/>}> 
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
              <ConfirmDelete 
                resourceName={"Bookings"} 
                disabled= {isDeleting}
                onConfirm={() => {
                  deleteBooking(bookingId,  {
                      onSettled: () => navigate(-1)
                    })
                }} />
          </Modal.Window>

        </Modal>

        {status === "unconfirmed" && ( <Button onClick={()=> navigate(`/checkin/${bookingId}`)} >
                Check in
        </Button>)}

        {status === "checked-in" && ( <Button icon={<HiArrowUpOnSquare/>}
               onClick={()=> {checkOut(bookingId)}}
               disabled={isCheckingOut}
        >
          Check out
        </Button>)}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
