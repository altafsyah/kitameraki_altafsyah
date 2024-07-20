import { createContext, useContext, useState } from "react";

export type OptionalFields = {
  name: string;
  type: string;
};

interface FormContextType {
  fields: OptionalFields[];
  handleFieldsAddition: (data: any[]) => boolean;
}

const FormContext = createContext<FormContextType>({
  fields: [],
  handleFieldsAddition: (data) => false,
});

export const FormProvider = ({ children }) => {
  const [fields, setFields] = useState<OptionalFields[]>([]);

  const handleFieldsAddition = (data: any[]) => {
    try {
      console.log(data);

      const additionFields: OptionalFields[] = [];
      data.forEach((item) =>
        additionFields.push({
          name: item["content"]["name"],
          type: item["content"]["type"],
        })
      );
      console.log(additionFields);

      setFields(additionFields);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  const value = { fields, handleFieldsAddition };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
