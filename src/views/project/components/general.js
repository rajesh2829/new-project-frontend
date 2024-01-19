import { useEffect, useState } from "react";
import Form from "../../../components/Form";
import Number from "../../../components/Number";
import SaveButton from "../../../components/SaveButton";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import { Projects } from "../../../helpers/Project";
import {
  default as NumberInput,
  default as Numbers,
} from "../../../lib/Number";
import String from "../../../lib/String";
import ProjectService from "../../../services/ProjectService";
import SlackService from "../../../services/SlackService";

const General = (props) => {
  const [channelList, setChannelList] = useState([]);

  const { projectData } = props;

  useEffect(() => {
    slackChannelList();
  }, []);

  const slackChannelList = async () => {
    const response = await SlackService.getChannelList();

    let channelList = response && response.channels

    let ChannelList = [];
    if (channelList && channelList.length > 0) {
      for (let i in channelList) {
        let { id, name } = channelList[i];
        ChannelList.push({
          label: name,
          value: id,
          id: id,
        });
      }
    }
    setChannelList(ChannelList);
  };

  const allowManualTicketOptions = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ];

  const updateData = (values) => {
    const id = props.match.params.id;
    const data = new FormData();
    data.append("name", String.Get(values.name));
    data.append("slug", String.Get(values.slug));
    data.append("code", String.Get(values.code));
    data.append("status", values?.status?.value ? values?.status?.value : "");
    data.append("sort", NumberInput.Get(values.sort));
    data.append("allowmanualticket", values?.allowmanualticket?.value);
    data.append("lastTicket", Numbers.Get(values.lastticket));
    data.append(
      "slack_channel_id",
      values && values?.slack_channel_id ? values?.slack_channel_id?.id : ""
    );
    data.append(
      "slack_channel_name",
      values && values?.slack_channel_id ? values?.slack_channel_id?.label : ""
    );

    ProjectService.updateProject(id, data);
    props.setEditable(true);
    // history.push("/projetct");/
  };

  const statusOption = [
    {
      label: "Active",
      value: 1
    },
    {
      label: "InActive",
      value: 2
    },

  ]

  return (
    <div>
      <div className="card p-3">
        <div className="field-wrapper mb-0 form-wrapper">
          <Form
            initialValues={{
              name: projectData?.projectData?.name,
              code: projectData?.projectData?.code,
              slug: projectData?.projectData?.slug,
              sort: projectData?.projectData?.sort,
              status: statusOption.find((data) => data?.value == projectData?.projectData?.status),
              allowmanualticket: {
                value: projectData?.projectData?.allow_manual_id,
                label: projectData?.projectData?.allow_manual_id,
              },
              lastticket: projectData?.projectData?.last_ticket_id,
              slack_channel_id: channelList.find(
                (data) => data?.id == projectData?.slack_channel_id
              ),
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              updateData(values);
            }}>
            <Text
              name="name"
              label="Name"
              placeholder="Enter Name"
              disabled={props?.editable}
            />
            <Text name="code" label="Code" placeholder="Code" fontBolded disabled={props?.editable} />

            <Text name="slug" label="Slug" placeholder="slug" fontBolded disabled={props?.editable} />

            <Select name="status" label="Status" options={statusOption} isDisabled={props?.editable} />

            <Number label="Sort" name="sort" fontBolded disabled={props?.editable} />

            <Select
              name="allowmanualticket"
              label="Allow Manual Ticket #"
              options={allowManualTicketOptions}
              fontBolded
              isDisabled={props?.editable}
            />

            <Number name="lastticket" label="Last  Ticket #" fontBolded disabled={props.editable} />

            <Select
              name="slack_channel_id"
              label="Slack Channel"
              options={channelList}
              isDisabled={props.editable}
            />

            {!props?.editable && (
              <div className="mt-2">
                <SaveButton type="submit" label="Save" />
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default General;
