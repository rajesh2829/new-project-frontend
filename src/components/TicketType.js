import React from "react"
import Select from "./Select"
import ProjectTicketTypeService from "../services/ProjectTicketTypeService"
import { useEffect } from "react"
import { useState } from "react"
import Url from "../lib/Url"

const TicketType = (props) => {

  let { name, placeholder, handleTicketTypeChange, required, label, projectId, typeList } = props;

  const [ticketType, setTicketType] = useState([])

  useEffect(() => {
    getTicketType()
  }, [projectId])

  let getTicketType = async () => {
    const project_id = projectId ? projectId.toString() : Url.GetParam("projectId")
    let response = await ProjectTicketTypeService.search({ projectId: project_id })
    let data = response && response?.data && response?.data?.data;
    if (response && response?.data && response?.data?.data) {
      let list = []
      for (let i = 0; i < data.length; i++) {
        const { name, id, userId, userName, default_story_point } = data[i];
        list.push({
          label: name, id: id, value: id, assigneeId: userId, assigneeName: userName, default_story_point: default_story_point
        })
      }

      setTicketType(list)
      typeList && typeList(list)
    } else {
      setTicketType([])
    }
  }

  return (
    <div>
      <Select
        name={name ? name : "ticketType"}
        placeholder={placeholder ? placeholder : "Select Ticket Type"}
        onInputChange={handleTicketTypeChange}
        label={label ? label : "Ticket Type"}
        options={ticketType}
        required={required}
      />
    </div>
  )
}

export default TicketType
