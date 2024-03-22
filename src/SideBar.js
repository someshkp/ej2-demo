import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { DashBoardSideBar } from "./_common/DashboardSideBar";
import { DataGrid } from "./_common/DataGrid";

export const SideBar = (props) => {
  let sidebarObj;
  function onCreate() {
    sidebarObj.element.style.visibility = "";
  }
  return (
    <div className="container">
      <DashBoardSideBar />
      <div className="content">{props.children}</div>
    </div>
  );
};
