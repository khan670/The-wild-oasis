import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditeCabin";

function CreateCabinForm({ cabinToEdit = {},onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { editCabin, isEditing } = useEditCabin();
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();

  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data?.image[0];

    // mutate(data);
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
               reset();
          },
        }
      );
  }
  function onError(errors) {
    
    toast.error("You need to full fill you all information");
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose?'modal':'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "The name is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "the minimum value must be atleast one",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "the minimum value must be atleast one",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "the minimum value must be atleast one",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "the descount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.discription?.message}
      >
        <Textarea
          type="number"
          id="discription"
          defaultValue=""
          {...register("discription", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "The name is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} onClick={onClose}>
          {isEditSession ? "Edit cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
