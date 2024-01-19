
  
  // Status options
  export const typeOptions = [
    {
        label: "Daily",
        value: "Daily"
      },
      {
        label: "Weekly",
        value: "Weekly"
      },
      {
        label: "Monthly",
        value: "Monthly"
      },
      {
        label: "Annually",
        value:  "Annually"
      }
  ];
  
  // Late hours status options
  export const DayOptions = [
    {
        label: "Monday",
        value: 1
      },
      {
        label: "Tuesday",
        value: 2
      },
      {
        label: "Wednesday",
        value: 3
      },
      {
        label: "Thursday",
        value: 4
      },
      {
        label: "Friday",
        value: 5
      },
      {
        label: "Saturday",
        value: 6
      },
      {
        label: "Sunday",
        value: 7
      }
  ];

  export const WeekOptions =[
    {
      label:"Week 1",
      value:1
    },
    {
      label:"Week 2",
      value:2
    },
    {
      label:"Week 3",
      value:3
    },
    {
      label:"Week 4",
      value:4
    },
  ]
  
  // Attendance status options
  export const monthOption = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 }
  ];
  
  export const dateOption = () => {
    const options = [];
    for (let i = 1; i <= 31; i++) {
      options.push(
        {
          label: i,
          value: i,
        }
      );
    }
   return options
  };

 export const RecurringTaskType = {
  MONTHLY: "Monthly",
  DAILY: "Daily",
  ANNUALLY: "Annually",
  WEEKLLY: "Weekly"
}