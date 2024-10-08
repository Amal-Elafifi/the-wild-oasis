import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;


function CreateCabinForm( {cabinEdit = {}, onCloseModal}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing ;

    const {id: editId, ...editValues} = cabinEdit;
    const isEditSession = Boolean(editId);
    const{register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession? editValues: {}
      });
    const {errors} = formState;
    // console.log(errors);

    function onSubmit(data){
      const image = typeof data.image === "string"? data.image: data.image[0];
      isEditSession? editCabin({newCabinData: {...data, image}, id: editId}, {
        onSuccess: (data)=> {
          reset();
          onCloseModal?.();
        }
      })
      :createCabin({...data, image: data.image[0]}, {
        onSuccess: (data) => {
          console.log(data);
          reset();
          onCloseModal?.();
        }
      })
    }

    function onError(errors){
        console.log(errors)
    }


    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal? "modal": "regular"}
      >
        <FormRow label="Cabin name" error= {errors?.name?.message }>
            <Input type="text" disabled={isWorking} id="name" {...register("name",{
                required: "this field is required"
              })}/>
        </FormRow>

        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity",{
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity can't be less than 1"
            }
          })}/>
        </FormRow>

        <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
          <Input type="number" disabled={isWorking} id="regularPrice" {...register("regularPrice", {
            required: "this field is required"
          })}/>
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount", {
            required: "this field is required",
          validate: (value) =>
                  value - getValues().regularPrice < 0 ||
                  "Discount should be less than regular price",
          })}/>
        </FormRow>

        <FormRow label="description for website" error={errors?.description?.message}>
          <Textarea type="number" id="description" defaultValue="" disabled={isWorking}/>
        </FormRow>

        <FormRow label="cabin photo" error={errors?.image?.message}>
          <FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", {
            required: isEditSession? false: "this field is required"}
          )}/>
        </FormRow>

        <FormRow2>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset" onClick={()=> onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEditSession? "Edit Cabin" : "Create new Cabin"}</Button>
        </FormRow2>

      </Form>
    );
};
export default CreateCabinForm;
