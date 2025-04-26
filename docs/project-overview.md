# Rwanda Healthcare Budget Monitoring System

## 1. Problem Statement

Healthcare facilities in Rwanda currently face challenges in systematically planning, executing, and monitoring budgets across different healthcare programs and organizational levels. This leads to:

- Inconsistent budget planning methods between hospitals and health centers
- Difficulty in tracking program-specific expenditures (HIV, Malaria, TB)
- Challenges in generating consolidated financial reports
- Limited visibility into budget execution status across the healthcare hierarchy
- Inefficient resource allocation across healthcare priorities

## 2. Project Goals

This application aims to provide a structured system for healthcare budget management in Rwanda by:

- Standardizing the planning and execution process for healthcare budgets
- Enabling hierarchical tracking from health centers up to hospital level
- Supporting program-specific budgeting for key national health priorities
- Providing accurate and timely financial reporting
- Improving financial accountability and transparency

## 3. Organizational Hierarchy

The Rwanda healthcare system is structured with a clear reporting hierarchy:

```
District
  ├── Hospital(s)
      ├── Health Center 1
      ├── Health Center 2
      └── Health Center n
```

**Key relationships:**
- Each district has at least one hospital and multiple health centers
- In districts with a single hospital, all health centers report to that hospital
- In districts with multiple hospitals, health centers are distributed among them
- Budget planning and execution happens at both hospital and health center levels
- Reporting consolidates from health centers up to hospitals

## 4. User Roles and Responsibilities

### Admin
- User management
- System configuration and maintenance
- Access to all system functionality
- Oversight of all financial data

### Hospital Finance Employee
- Creates and manages hospital-level budget plans
- Creates and manages health center budget plans
- Executes hospital-level plans (expenditure tracking)
- Executes health center plans (on their behalf)
- Generates and reviews financial reports

### System (Automated)
- Consolidates financial data across facilities
- Generates standardized reports
- Calculates financial metrics and balances
- Enforces data integrity and validation

## 5. Key Features

### Planning Module
- Annual budget creation with quarterly breakdowns
- Program-specific planning (HIV, Malaria, TB)
- Categorization according to National Strategic Plan components
- Budget allocation across multiple health centers

### Execution Module
- Expenditure tracking against planned budget
- Progress monitoring by program and category
- Quarterly execution tracking

### Reporting Module
- Statement of revenue and expenditure
- Statement of financial assets and liabilities
- Statement of cash flows
- Statement of changes in net assets
- Statement of comparison of budget and actual amounts

## 6. Budget Structure

### Time Frame
- Annual plans broken down into four quarters

### Programs
- HIV
- Malaria
- TB

### National Strategic Plan (NSP) Categories
1. **Human Resource**
   - Bonus
   - LAB Technician
   - Nurses

2. **Travel Related Costs (TRC)**
   - Workshop
   - Supervision
   - Transport

3. **Health Products and Equipment (HPE)**
   - Maintenance and Repair

4. **Program Administration (PA) Costs**
   - Communication
   - Internet
   - Office
   - Transport
   - Bank Charges

## 7. Data Flow Structure

**Detailed Flow:**
1. Hospital finance employee creates plans for both hospital and health centers
2. System stores plan details with appropriate categorization
3. Hospital finance employee records expenditures against plans
4. System tracks execution progress and calculates variances
5. System generates consolidated financial reports

## 8. Database Schema (Conceptual)

### Entities

1. **Users**
   - User details and role information

2. **Districts**
   - Geographic organization units

3. **Facilities**
   - Hospitals and health centers
   - Hierarchical relationships

4. **Programs**
   - HIV, Malaria, TB program definitions

5. **BudgetCategories**
   - NSP categories and subcategories

6. **Plans**
   - Budget plans with associated metadata
   - Links to facility, program, and time period

7. **PlanItems**
   - Line items within each plan
   - Category, amount, and quarter allocation

8. **Executions**
   - Actual expenditures recorded against plans
   - Amount, date, and associated plan item

9. **Reports**
   - Generated financial statements
   - Report metadata and parameters

## 9. Technical Architecture

The application will be built using:
- **Frontend**: Next.js with React and Tailwind CSS
- **Backend**: Next.js API routes / Hono API
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Standard web hosting with database service

## 10. Security Considerations

- Role-based access control implemented through authentication system
- Data segregation by district and facility
- Audit logging for sensitive operations
- Secure API design with proper validation

## 11. Future Extensions (Not in Initial Scope)

- Mobile application for field data collection
- Integration with national health management information systems
- Advanced analytics and forecasting
- Historical data comparison and trend analysis
- Document management for supporting financial documentation

## 12. Success Metrics

- Complete and accurate financial reporting
- Reduction in budget planning time
- Improved budget execution tracking
- Enhanced visibility into program-specific expenditures
- Standardized processes across facilities
