import { ActivityCategoryType } from '../features/planning/schemas';

// Categories and their activities for Hospitals
export const HOSPITAL_ACTIVITIES: ActivityCategoryType = {
  "Human Resources (HR)": [
    {
      activity: "Provide salaries for hospital medical staff",
      typeOfActivity: "Salary"
    },
    {
      activity: "Provide salaries for hospital administrative staff",
      typeOfActivity: "Salary"
    },
    {
      activity: "Provide performance bonuses for hospital staff",
      typeOfActivity: "Bonus 2023/2024"
    }
  ],
  "Travel Related Costs (TRC)": [
    {
      activity: "Conduct specialized clinics in remote areas",
      typeOfActivity: "Outreach"
    },
    {
      activity: "Conduct medical staff training workshops",
      typeOfActivity: "Workshop"
    },
    {
      activity: "Conduct patient referral transportation",
      typeOfActivity: "Transport"
    }
  ],
  "Health Products & Equipment (HPE)": [
    {
      activity: "Maintain medical equipment",
      typeOfActivity: "Maintenance and Repair"
    },
    {
      activity: "Purchase specialized medical equipment",
      typeOfActivity: "Equipment"
    },
    {
      activity: "Supply pharmaceutical products",
      typeOfActivity: "Medical Supplies"
    }
  ],
  "Program Administration Costs (PA)": [
    {
      activity: "Provide running costs for hospital facilities",
      typeOfActivity: "Utilities"
    },
    {
      activity: "Provide running costs for hospital facilities",
      typeOfActivity: "Communication"
    },
    {
      activity: "Provide running costs for hospital facilities",
      typeOfActivity: "Office Supplies"
    },
    {
      activity: "Provide running costs for hospital facilities",
      typeOfActivity: "Administrative Support"
    }
  ],
  "Specialized Services": [
    {
      activity: "Operate emergency department",
      typeOfActivity: "Emergency Services"
    },
    {
      activity: "Conduct laboratory services",
      typeOfActivity: "Diagnostics"
    },
    {
      activity: "Provide surgical services",
      typeOfActivity: "Surgery"
    }
  ]
}; 