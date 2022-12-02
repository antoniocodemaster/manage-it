import { useCallback } from "react";
import { useState } from "react";

const useForm = (initialValues) => {
   const [formValues, setFormValues] = useState(initialValues);

   const handleInputChange = useCallback(
      ({ target }) => setFormValues((prev) => ({ ...prev, [target.name]: target.value })),
      [setFormValues]
   );

   const resetValues = useCallback(
      (newFormState = initialValues) => {
         setFormValues(newFormState);
      },
      [setFormValues, initialValues]
   );

   return [formValues, handleInputChange, resetValues];
};

export default useForm;
