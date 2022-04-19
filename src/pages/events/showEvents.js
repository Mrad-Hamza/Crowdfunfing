import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import { PickList } from "primereact/picklist";
import { OrderList } from "primereact/orderlist";
import { ProductService } from "../../features/services/ProductService";
import { InputText } from "primereact/inputtext";


const ShowEvents = () => {
    // const listValue = [
    //     { name: "San Francisco", code: "SF" },
    //     { name: "London", code: "LDN" },
    //     { name: "Paris", code: "PRS" },
    //     { name: "Istanbul", code: "IST" },
    //     { name: "Berlin", code: "BRL" },
    //     { name: "Barcelona", code: "BRC" },
    //     { name: "Rome", code: "RM" },
    // ];

    // const [picklistSourceValue, setPicklistSourceValue] = useState(listValue);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);
    // const [orderlistValue, setOrderlistValue] = useState(listValue);

    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState("grid");
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    // const sortOptions = [
    //     { label: "Price High to Low", value: "!price" },
    //     { label: "Price Low to High", value: "price" },
    // ];
	
    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setDataviewValue(data));
    }, []);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf("!") === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

  

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between">
                        {/* <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{data.category}</span>
                        </div> */}
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                    <div className="text-center">
                        <img src={`assets/demo/images/product/${data.image}`} alt={data.name} className="w-9 shadow-2 my-3 mx-0" />
                        <div className="text-2xl font-bold">{data.name}</div>
                        <div className="mb-3">{data.description}</div>
                        {/* <Rating value={data.rating} readonly cancel={false} /> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${data.price}</span>
                        {/* <Button icon="pi pi-shopping-cart" disabled={data.inventoryStatus === "OUTOFSTOCK"} /> */}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }
       if (layout === "grid") {
            return dataviewGridItem(data);
        }
    };

    return (
        <div>
            <div className="grid list-demo">
                <div className="col-12">
                    <div className="card">
                        <h5>Evenements</h5>
                        <DataView value={dataviewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate}></DataView>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ShowEvents, comparisonFn);
