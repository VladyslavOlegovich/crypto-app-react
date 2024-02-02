//https://www.youtube.com/watch?v=tKM44vPHU0U&ab_channel=UlbiTV
//https://www.youtube.com/watch?v=fN25fMQZ2v0&list=PL6DxKON1uLOEbfFpZQA9aztkj-guW52jn&ab_channel=UlbiTV
//https://www.youtube.com/watch?v=ElaIKk8ba5g&list=PL6DxKON1uLOEbfFpZQA9aztkj-guW52jn&index=5&ab_channel=UlbiTV

import { Button, Layout, Select, Space, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);
  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  const { crypto } = useCrypto();
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        destroyOnClose
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
