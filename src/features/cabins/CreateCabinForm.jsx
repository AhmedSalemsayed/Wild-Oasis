/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditing = Boolean(editId);

  const { createCabin, isCreatingCabin } = useCreateCabin();
  const { editCabin, isEditingCabin } = useEditCabin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: isEditing ? editValues : {} });

  const isWorking = isCreatingCabin || isEditingCabin;

  function onSubmit(data) {
    // in case of editting a cabin , the user may update the image (new file list) or leave it as it is (url of the image in the bucket)
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (!editId) {
      createCabin({ ...data, image: image });
      closeModal();
    } else {
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
      closeModal();
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", { required: "This is required" })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This is required" })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              " must be less than the regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditing ? false : "This is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
