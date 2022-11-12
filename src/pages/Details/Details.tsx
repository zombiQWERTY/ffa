import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../components/Table";
import { CountriesApi } from "../../store/Countries";

interface RotatedTableData {
  left: string;
  right: ReactNode;
}

export const Details = () => {
  const { alphaCode } = useParams();

  const { data, isLoading } = CountriesApi.useGetCountryByCodeQuery(
    alphaCode || ""
  );

  const rotatedData = useMemo<RotatedTableData[]>(() => {
    if (!data) {
      return [];
    }

    return [
      { left: "Common Name", right: data.name.common },
      { left: "Official Name", right: data.name.official },
      {
        left: "Currencies",
        right: Object.values(data.currencies || {}).map(({ name, symbol }) => (
          <p key={name}>
            {name} - {symbol}
          </p>
        )),
      },
      {
        left: "Languages",
        right: Object.values(data.languages || {}).join(" | "),
      },
      {
        left: "Flag",
        right: (() => {
          const { svg, png } = data.flags;
          return svg || png ? (
            <img src={svg || png} alt={data.flag || ""} />
          ) : (
            data.flag
          );
        })(),
      },
    ];
  }, [data]);

  const columnHelper = createColumnHelper<RotatedTableData>();
  const columns = useMemo<ColumnDef<RotatedTableData>[]>(
    () => [
      {
        header: "Field",
        accessorKey: "left",
      },
      columnHelper.display({
        header: "Value",
        cell: (props) => props.row.original.right,
      }),
    ],
    [columnHelper]
  );

  return <Table columns={columns} data={rotatedData} loading={isLoading} />;
};
