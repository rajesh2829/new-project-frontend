import React from "react";

function InputLabel() {
  return (
    <div>
      {arrayList &&
        arrayList > 0 &&
        arrayList.map((data) => (
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">{data.name}</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={placeholder}
              />
            </div>
          </form>
        ))}
    </div>
  );
}

export default InputLabel;
