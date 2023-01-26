const formFields = [
  //   {
  //     type: "text",
  //     name: "firstname",
  //     label: "First name",
  //     rules: { required: { value: true, message: "Field is required!" } },
  //   },
  //   {
  //     type: "text",
  //     name: "lastname",
  //     label: "Last name",
  //     rules: { required: { value: true, message: "Field is required!" } },
  //   },
  //   {
  //     type: "checkbox",
  //     name: "firstcheckbox",
  //     label: "First Checkbox",
  //   },
  //   {
  //     type: "checkbox",
  //     name: "secondcheckbox",
  //     label: "Second Checkbox",
  //   },
  {
    type: "select",
    name: "country",
    label: "Country",
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "Vanilla", label: "Vanilla" },
    ],
    rules: { required: { value: true, message: "Field is required!" } },
  },
  {
    type: "select",
    name: "bry",
    label: "bry",
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "Vanilla", label: "Vanilla" },
    ],
    rules: { required: { value: true, message: "Field is required!" } },
  },
];

export default formFields;
