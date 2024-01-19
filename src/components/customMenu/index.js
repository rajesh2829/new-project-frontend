import React, { useCallback, useRef } from "react";
import { VariableSizeList as List } from "react-window";
import { useWindowResize } from "./WindowResize";

const Row = ({ data, index, setSize, windowWidth }) => {
    const rowRef = useRef();

    React.useEffect(() => {
        setSize(index, rowRef.current.getBoundingClientRect().height);
    }, [setSize, index, windowWidth]);

    return (
        <div
            ref={rowRef}
            style={{
                ...styles.row,
            }}
        >
            {data[index]}
        </div>
    );
};

export default function CustomMenu({ children }) {

    const listRef = useRef();

    const data = children && children.length > 0 ? children : [];

    const sizeMap = useRef({});
   
    const setSize = useCallback((index, size) => {
        sizeMap.current = { ...sizeMap.current, [index]: size };
        listRef.current.resetAfterIndex(index);
    }, []);
   
    const getSize = index => sizeMap.current[index] || 50;
   
    const [windowWidth] = useWindowResize();

    return (
        <List
            ref={listRef}
            height={300}
            width="100%"
            itemCount={data.length}
            itemSize={getSize}
            itemData={data}
        >
            {({ data, index, style }) => (
                <div style={style}>
                    <Row
                        data={data}
                        index={index}
                        setSize={setSize}
                        windowWidth={windowWidth}
                    />
                </div>
            )}
        </List>
    );
}

const styles = {
    row: {
        boxSizing: "border-box",
    }
};
