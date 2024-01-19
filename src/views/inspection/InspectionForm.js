import React from "react";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import CustomForm from "../../components/customFieldsList/CustomForm";
import ObjectName from "../../helpers/ObjectName";
import Url from "../../lib/Url";

const InspectionForm = (props) => {
    const locationName = Url.GetParam("location")

    const tagId = Url.GetParam("tagId")
    const breadcrumbList = [
        { label: "Home", link: "/inspections" },
        {
            label: locationName,
            link: `/inspections`,
        },
    ];

    return (
        <div>
            <BreadCrumb list={breadcrumbList} />
            <div className="pb-4">
                <PageTitle label={`${locationName}`} />
                <CustomForm
                    objectName={ObjectName.INSPECTION}
                    objectId={props.match.params.id}
                    tagId={tagId}
                />
            </div>
        </div>
    );
};

export default InspectionForm;
