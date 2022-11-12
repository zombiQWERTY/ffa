import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "../../components/Icon";
import { Modal, useModal } from "../../components/Modal";
import { Table } from "../../components/Table";
import { CountriesApi, Country, CountryName } from "../../store/Countries";

export const Home = () => {
  const { data, isLoading } = CountriesApi.useGetCountryListQuery();

  const [modalContent, setModalContent] = useState<Record<string, string>>();
  const { isShowing, toggle: toggleModal } = useModal();

  const applyModalContent = useCallback(
    (name: CountryName) => () => {
      const nativeName = Object.values(name.nativeName || {})[0];

      setModalContent({
        commonEng: name.common,
        commonNative: nativeName?.common || "N/A",
        officialEng: name.official,
        officialNative: nativeName?.official || "N/A",
      });

      toggleModal();
    },
    [toggleModal, setModalContent]
  );

  const columnHelper = createColumnHelper<Country>();
  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
      { header: "CCA2", accessorKey: "cca2" },
      columnHelper.display({
        header: "Name",
        cell: (props) => (
          <span
            className="cursor-pointer hover:text-blue-700"
            onClick={applyModalContent(props.row.original.name)}
          >
            {props.row.original.name.common}
          </span>
        ),
      }),
      { header: "Capital", accessorKey: "capital" },
      columnHelper.display({
        header: "Actions",
        cell: (props) => (
          <Link
            to={`/details/${props.row.original.cca3}`}
            className="cursor-pointer inline"
          >
            <Eye className="inline eye-icon" />
          </Link>
        ),
      }),
    ],
    [columnHelper, applyModalContent]
  );

  return (
    <>
      <Table
        columns={columns}
        data={data || []}
        loading={isLoading}
        pagination
      />
      <Modal isShowing={isShowing} toggle={toggleModal} title="Country Name">
        {modalContent && (
          <>
            Common name in English: {modalContent.commonEng}
            <br />
            Common name in Native: {modalContent.commonNative}
            <br />
            Official name in English: {modalContent.officialEng}
            <br />
            Official name in Native: {modalContent.officialNative}
          </>
        )}
      </Modal>
    </>
  );
};
