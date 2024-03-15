const initialClinic = {
  startDate: undefined,
  endDate: undefined,
  dayLength: 5,
  statusDisplay: "many",
  categoriesData: [],
};

const DentistReducer = (state = initialClinic, action) => {
  switch (action.type) {
    case "SET_API_DATA":
      return {
        ...state,
        apiData: action.payload,
      };
    default:
      return state;
  }
};

export default DentistReducer;
