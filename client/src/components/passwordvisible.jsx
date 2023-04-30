import {EyeTwoTone,EyeInvisibleOutlined} from "@ant-design/icons";
import {Button, Input, Space} from "antd";
import React from "react";
import styles  from "../pages/Login/styles.module.css"
const PasswordVisible = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Space direction="vertical">
      <Input.Password
        className={styles.input}
        placeholder="input password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
    </Space>
  );
};
export default PasswordVisible;
