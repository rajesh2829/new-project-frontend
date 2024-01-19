import React from "react";

// Components
import PageTitle from "../../components/PageTitle";
import Form from "../../components/Form";
import Button from "../../components/Button";
import {
  EditorState,
  convertFromRaw,
} from "draft-js";
import DraftEditor from "../../components/Draft";

const DocsList = (props) => {
  const { activeTab, match, List } = props;

  const Data = List.find((data1) => data1.title === activeTab);

  return (
    <>
      <PageTitle label={activeTab} />
      <Form>
        <div className="card-body">
          <div className="row justify-content-between m-3">
            <div className="">
              <h3>
                <b>{activeTab}</b>
              </h3>
            </div>
            <div>
              <Button
                label="Edit"
                className="docsedit"
                onClick={() => {
                  props.history.push(
                    `/docs/${match.params.tab}/${activeTab}/details`
                  );
                }}
              />
            </div>
          </div>

          <div>
            {Data && Data.title == activeTab && Data.content !== null && Data.content !== "" ? (
              <DraftEditor
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(Data.content))
                )}
              />
            ) : (
              <>
                <hr />
                <p>No Content Added Yet</p>
              </>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};
export default DocsList;
