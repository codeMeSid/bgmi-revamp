import { useEffect, useState } from "react";
import NoData from "../NoData";

type Props = {
  children?: any;
  data?: Array<any>;
  fetchData?: () => Promise<any>;
};

export default function DataContent(props: Props) {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (props?.fetchData)
      (async () => {
        if (!props?.fetchData) return;
        const responseData = await props?.fetchData();
        setData(responseData);
      })();
    else if (props?.data) setData(props?.data || []);
  }, [props.data, props.fetchData]);
  return Boolean(data.length) ? props.children({ data }) : <NoData />;
}
