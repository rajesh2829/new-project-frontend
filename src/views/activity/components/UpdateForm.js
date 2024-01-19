
import React, { useState } from 'react'
import DateSelector from '../../../components/Date';
import Select from '../../../components/Select';
import Text from '../../../components/Text';
import TextArea from '../../../components/TextArea';
import MediaCarousel from "../../../components/MediaCarousel";
import ObjectName from '../../../helpers/ObjectName';

const UpdateForm = ({ id, history, usersList, activityList, statusList }) => {

    const [isModelOpen, setIsModelOpen] = useState(false)
    const [imageCount, setImageCount] = useState(0);

    const __toggle = () => {
        setIsModelOpen(!isModelOpen);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <DateSelector label="Date" name="date" format="dd-MMM-yyyy" />
                </div>
                <div className="col-6">
                    <Select label="Owner" name="owner" options={usersList} />
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <Select label="Activity Type" name="activity_type" options={activityList} />
                </div>
                <div className="col-6">
                    <Select label="Status" name="status" options={statusList} />

                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <DateSelector label="Start Date" name="start_date" format="dd-MMM-yyyy" />
                </div>
                <div className="col-6">
                    <DateSelector label="End Date" name="end_date" format="dd-MMM-yyyy" />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <Text label="Cost" name="cost" />
                </div>
                <div className="col-4">
                    <Text label="Estimated Hours" name="estimated_hours" />
                </div>
                <div className="col-4">
                    <Text label="Actual Hours" name="actual_hours" />
                </div>
            </div>

            <TextArea label="Explanation" name="explanation" />

            <TextArea label="Notes" name="notes" />
            <MediaCarousel
                showCarasoul
                title="Bill"
                objectName={ObjectName.ACTIVITY}
                objectId={id}
                history={history}
                billView={true}
                attachmentsList={true}
                modalOpen={isModelOpen}
                toggle={__toggle}
                setIsModelOpen={setIsModelOpen}
                imageCount={setImageCount}
                numberOfImage={imageCount}
                Attachments={"Attachments"}
            />
        </>

    )
}

export default UpdateForm;