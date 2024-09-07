import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings } = useSettings();
  const { updateSettings, isUpdatingSettings } = useUpdateSettings();
  const { register } = useForm({ defaultValues: settings });

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdatingSettings}
          {...register("minBookingLength", {
            onBlur: (e) => updateSettings({ minBookingLength: e.target.value }),
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSettings}
          {...register("maxBookingLength", {
            onBlur: (e) => updateSettings({ maxBookingLength: e.target.value }),
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSettings}
          {...register("maxGuestsPerBooking", {
            onBlur: (e) =>
              updateSettings({ maxGuestsPerBooking: e.target.value }),
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSettings}
          {...register("breakfastPrice", {
            onBlur: (e) => updateSettings({ breakfastPrice: e.target.value }),
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
