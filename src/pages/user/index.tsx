import React, { useEffect, useState } from "react";
import { Pagination, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import userAPI from "services/userAPI";
import { Input } from "antd";
import useDebounce from "hooks/useDebounce";
import { SlideBar } from "components/SlideBar";
import {
  StyleContainer,
  StyleContentLeft,
  StyleContetnRight,
  StyleTitle,
} from "./style";
import user from "assets/images/userAccount.png";

const { Search } = Input;

interface DataType {
  key: string;
  fullName: string;
  age: number;
  address: string;
  tags: string[];
  gender?: string;
}

const User: any = (props: any) => {
  const [data, setData] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedValue = useDebounce<string>(keySearch, 500);
  const pageSize = 5;

  const getProfile = async () => {
    const { data } = await userAPI.getUser({
      search: keySearch,
      page: 1,
      limit: 10,
    });
    setData(data.rows);
  };

  const filltedUser = data?.filter((item: any) => item?.role === "user");

  const handleSearch = (event: any) => {
    setKeySearch(event.target.value);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const dataList: DataType[] = filltedUser;

  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.columnKey === sortedColumn) {
      // Clicking on the same column, toggle sort order
      setSortOrder((prevOrder) =>
        prevOrder === "ascend" ? "descend" : "ascend"
      );
    } else {
      // Clicking on a different column, set new sort column and order
      setSortedColumn(sorter.columnKey);
      setSortOrder("ascend");
    }
  };

  const sortedData: DataType[] = [...dataList].sort(
    (a: DataType, b: DataType) => {
      if (sortedColumn === "fullName") {
        return sortOrder === "ascend"
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      }
      return 0;
    }
  );

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (text, record, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    {
      title: "",
      dataIndex: "avatar",
      // colSpan: 2,
      render: (imageUrl) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            style={{ borderRadius: "50%" }} // Add margin-right for spacing
            width="50px"
            height="50px"
            src={imageUrl ? imageUrl : user}
            alt="Product"
          />
        </div>
      ),
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: null,
      // colSpan: 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Giới tính",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "CCCD/CMND",
      key: "citizenId",
      dataIndex: "citizenId",
    },
    {
      title: "Nơi cấp",
      key: "citizenAdd",
      dataIndex: "citizenAdd",
    },
  ];

  return (
    <StyleContainer>
      <StyleContentLeft>
        <SlideBar />
      </StyleContentLeft>
      <StyleContetnRight>
        <StyleTitle>Quản lý người dùng</StyleTitle>
        <Search
          size="large"
          placeholder="Tìm kiếm: Họ và Tên, Số điện thoại"
          style={{ width: 400 }}
          value={keySearch}
          onChange={handleSearch}
        />
        <Table
          columns={columns}
          dataSource={paginatedData}
          onChange={handleChange}
          pagination={false}
        />
         <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handleChangePage}
            style={{ paddingTop: "24px" }}
          />
      </StyleContetnRight>
    </StyleContainer>
  );
};

export default User;
