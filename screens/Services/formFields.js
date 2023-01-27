const formFields = [
  {
    type: "text",
    name: "firstname",
    label: "First name",
    rules: { required: { value: true, message: "Field is required!" } },
  },
  {
    type: "text",
    name: "lastname",
    label: "Last name",
    rules: { required: { value: true, message: "Field is required!" } },
  },
  {
    type: "checkbox",
    name: "firstcheckbox",
    label: "First Checkbox",
  },
  {
    type: "checkbox",
    name: "secondcheckbox",
    label: "Second Checkbox",
  },
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
    type: "selectmulti",
    name: "group  ",
    label: "Group select",
    options: [
      { value: "chocolate1", label: "Chocolate1" },
      { value: "strawberry1", label: "Strawberry1" },
      { value: "Vanilla1", label: "Vanilla1" },
    ],
    rules: { required: { value: true, message: "Field is required!" } },
  },
];

export default formFields;
