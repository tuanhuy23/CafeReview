import React from "react";
import { Button, Input } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Ant Design</h1>
      <Input placeholder="Enter your text" style={{ marginBottom: "10px" }} />
      <Button type="primary">Click Me</Button>
    </div>
  );
};

export default App;