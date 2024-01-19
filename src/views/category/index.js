import React from 'react'
import TagList from "../../components/TagList";

const Category = (props) => {
  const {history} = props
  return (
    <div>
      <TagList   tagType={"Account Entry Category"} history={history} noTagDetail={true}/>
    </div>
  )
}

export default Category