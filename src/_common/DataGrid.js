import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  GridComponent,
  Inject,
  Page,
  Search,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import * as React from "react";
import { sampleData } from "../data";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DataUtil } from "@syncfusion/ej2-data";
import {
  FormValidator,
  NumericTextBoxComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Browser, extend, isNullOrUndefined } from "@syncfusion/ej2-base";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

let formObject;
function DataGrid() {
  let grid;
  let count = 0;
  const [search, setSearch] = React.useState("customer_name");
  const pageSettings = { pageSize: 5, pageCount: 3 };
  const toolbarOptions = [
    "Search",
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
  ];
  const searchOptions = {
    fields: [`${search}`],
    ignoreCase: true,
    key: "",
    operator: "contains",
  };

  const ddlData = [
    { text: "Customer Name", value: "customer_name" },
    { text: "Property Name", value: "property_name" },
    { text: "Loan Amount", value: "property_value" },
    { text: "Status", value: "status" },
  ];
  // const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  // const handleClick = () => {
  //   setIsDialogOpen(true); // Open the dialog when button is clicked
  // };
  const [status, setStatus] = React.useState(false);
  // const handleClick = () => {
  //   setStatus(true);
  // };

  const valueChange = (args) => {
    const searchOperator = args.itemData.value;
    setSearch(searchOperator);
  };

  const dialogClose = () => {
    setStatus(false);
  };
  function handleClick() {
    setStatus(true);
  }

  // ------------form --------------//
  function dialogTemplate(props) {
    return <DialogFormTemplate {...props} />;
  }
  // --------------edit option----------------//

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showConfirmDialog: false,
    mode: "Dialog",
    template: dialogTemplate,
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <label style={{ padding: "10px 10px 26px 0" }}>
          Select fileds to search:
        </label>
        <DropDownListComponent
          id="value"
          index={0}
          width={150}
          dataSource={ddlData}
          change={valueChange}
        ></DropDownListComponent>
        {/* </div> */}
      </div>

      <GridComponent
        dataSource={sampleData}
        height={185}
        ref={(g) => (grid = g)}
        toolbar={toolbarOptions}
        editSettings={editOptions}
        searchSettings={searchOptions}
        allowPaging={true}
        pageSettings={pageSettings}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="customer_name"
            headerText="Customer Name"
            width="150"
            textAlign="left"
          />
          <ColumnDirective
            field="property_name"
            headerText="Property Name"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="property_value"
            headerText="Loan Amount"
            width="150"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            field="lead_creation_date"
            headerText="Lead Creation Date"
            editType="datepickeredit"
            width="150"
            format="YYYY-MM-DD"
            textAlign="Left"
          />
          <ColumnDirective
            field="status"
            headerText="Status"
            editType="dropdownedit"
            width="150"
            format="C2"
            textAlign="Left"
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Search, Toolbar, Edit]} />
      </GridComponent>
    </div>
  );
}
function DialogFormTemplate(props) {
  const customer_employment_details_dropDown = DataUtil.distinct(
    sampleData,
    "customer_employment_details",
    true
  );
  const statusOptions = DataUtil.distinct(sampleData, "status", true);

  let property_name;
  let customer_name;
  let property_size;
  let customer_cibil_score;
  let monthly_income;
  let monthly_obligations;
  let customer_employment_details;
  const [val, setval] = React.useState(extend({}, {}, props, true));
  function onChange(args) {
    let key = args.target.name;
    let value = args.target.value;
    setval((prevVal) => ({ ...prevVal, [key]: value }));
  }
  let data = val;
  // react warning error purpose
  if (data.isAdd) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      if (data[keys[i]] !== "isAdd" && isNullOrUndefined(data[keys[i]])) {
        data[keys[i]] = "";
      }
    }
  }

  console.log(data);
  return (
    <div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <div className="e-float-input e-control-wrapper">
            <input
              ref={(input) => (property_name = input)}
              value={data.property_name}
              id="property_name"
              name="property_name"
              type="text"
              onChange={onChange.bind(this)}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Property Name</label>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <NumericTextBoxComponent
            id="property_value"
            format="C2"
            value={data.property_value}
            placeholder="Property Value"
            floatLabelType="Always"
          ></NumericTextBoxComponent>
        </div>
        <div className="form-group col-md-6">
          <div className="e-float-input e-control-wrapper">
            <input
              ref={(input) => (property_size = input)}
              value={data.property_size}
              id="property_size"
              name="property_size"
              type="text"
              onChange={onChange.bind(this)}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Property Size</label>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <div className="e-float-input e-control-wrapper">
            <input
              ref={(input) => (customer_name = input)}
              value={data.customer_name}
              id="customer_name"
              name="customer_name"
              type="text"
              onChange={onChange.bind(this)}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Customer Name</label>
          </div>
        </div>
        <div className="form-group col-md-6">
          <div className="e-float-input e-control-wrapper">
            <input
              ref={(input) => (customer_cibil_score = input)}
              value={data.customer_cibil_score}
              id="customer_cibil_score"
              name="customer_cibil_score"
              type="number"
              onChange={onChange.bind(this)}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">
              Customer CIBIL Score
            </label>
          </div>
        </div>

        {parseInt(data.customer_cibil_score) >= 500 ? (
          <div className="form-group col-md-6">
            <DropDownListComponent
              id="customer_employment_details"
              name="customer_employment_details"
              value={data.customer_employment_details}
              dataSource={customer_employment_details_dropDown}
              fields={{
                text: "customer_employment_details",
                value: "customer_employment_details",
              }}
              placeholder="Customer Employement Details"
              popupHeight="300px"
              floatLabelType="Always"
              onChange={onChange.bind(this)}
            ></DropDownListComponent>
          </div>
        ) : (
          ""
        )}
        {data.customer_employment_details === "salaried" ? (
          <>
            <div className="form-group col-md-6">
              <div className="e-float-input e-control-wrapper">
                <input
                  ref={(input) => (monthly_income = input)}
                  value={data.monthly_income}
                  id="monthly_income"
                  name="monthly_income"
                  type="number"
                  onChange={onChange.bind(this)}
                />
                <span className="e-float-line"></span>
                <label className="e-float-text e-label-top">
                  Monthly Income
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="e-float-input e-control-wrapper">
                <input
                  ref={(input) => (monthly_obligations = input)}
                  value={data.monthly_obligations}
                  id="monthly_obligations"
                  name="monthly_obligations"
                  type="number"
                  onChange={onChange.bind(this)}
                />
                <span className="e-float-line"></span>
                <label className="e-float-text e-label-top">
                  Monthly Obligations
                </label>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {data.customer_employment_details === "non-salaried" ? (
          <div className="form-group col-md-6">
            <div className="e-float-input e-control-wrapper">
              <input
                ref={(input) => (monthly_income = input)}
                value={data.monthly_income}
                id="monthly_income"
                name="monthly_income"
                type="number"
                onChange={onChange.bind(this)}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Monthly Income</label>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="form-group col-md-6">
          <DropDownListComponent
            id="status"
            value={data.status}
            dataSource={statusOptions}
            fields={{ text: "status", value: "status" }}
            placeholder="Status"
            popupHeight="300px"
            floatLabelType="Always"
            onChange={onChange.bind(this)}
          ></DropDownListComponent>
        </div>
        <div className="form-group col-md-6">
          <DatePickerComponent
            id="lead_creation_date"
            value={data.lead_creation_date}
            placeholder="Lead Creation Date"
            format="yMd"
            floatLabelType="Always"
          ></DatePickerComponent>
        </div>
      </div>
    </div>
  );
}
export default DataGrid;
