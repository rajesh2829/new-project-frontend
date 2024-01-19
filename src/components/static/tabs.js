import React from "react";

function Tabs() {
  return (
    <div>
      <ul class="nav">
        {array.List &&
          arrayList > 0 &&
          arrayList.map((data) => (
            <li class="nav-item">
              <a class="nav-link active" href={data.url}>
                {data.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tabs;
