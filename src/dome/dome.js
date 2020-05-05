import { Picker, List, WhiteSpace } from "antd-mobile";
import { createForm } from "rc-form";
import arrayTreeFilter from "array-tree-filter";

import { district, provinceLite } from "antd-mobile-demo-data";

// 如果不是使用 List.Item 作为 children

class Test extends React.Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <WhiteSpace size="lg" />
        <List style={{ backgroundColor: "white" }} className="picker-list">
          <Picker
            data={district}
            cols={1}
            {...getFieldProps("district3")}
            className="forss"
          >
            <List.Item arrow="horizontal">Single</List.Item>
          </Picker>
        </List>
      </div>
    );
  }
}

const TestWrapper = createForm()(Test);

ReactDOM.render(<TestWrapper />, mountNode);
