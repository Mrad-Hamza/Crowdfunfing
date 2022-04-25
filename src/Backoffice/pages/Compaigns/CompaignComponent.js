import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const CompaignsComponent = ()=> {
    const compaigns = useSelector((state) => state.compaigns.compaigns);
    const renderList = compaigns.map((compaign) => {
        const { _id, nameCompaign, typeCompaign, objective,description,deadline,Verified,Status } = compaign;

    return (
        <div key={_id}>
                <Link to={`/compaigns/${_id}`}>
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Filter Menu</h5>
                    <DataTable  paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu"  responsiveLayout="scroll"
                          emptyMessage="No customers found.">
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={nameCompaign} />
                        <Column header="Compaign" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={typeCompaign}/>
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={ objective} />
                        <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={description}  />
                        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={Status}  />
                        <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={deadline} />
                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={Verified}  />
                    </DataTable>
                </div>
            </div>

            </div>
            </Link>
        </div>
        
        );
    });

    return renderList;

};
export default CompaignsComponent;