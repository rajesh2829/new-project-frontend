import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import StatisticsCountCard from "../../components/StatisticsCountCard";
import PaymentAccountService from "../../services/PaymentAccountService";

const AccountDashboard = () => {

  const [countDetail, setCountDetail] = useState();

  useEffect(() => {
    getDashboardCount();
  }, []);

  const getDashboardCount = async () => {
    const getCount = await PaymentAccountService.dashboard();
    setCountDetail(getCount);
  };

  return (
    <div>
      <PageTitle label="Dashboard" />
      <div
        className={["d-flex justify-content-start"].join(" ")}
      >

        <StatisticsCountCard
          label="Accounts"
          icon={<FontAwesomeIcon icon={faBuildingColumns} />}
          className={"text-white"}
          count={countDetail && countDetail.accountCount}
          redirectUrl="/accounts"
        />
        <StatisticsCountCard
          icon={<FontAwesomeIcon icon={faBuildingColumns} />}
          className={"text-white"}
          label="Accounts Entry"
          count={countDetail && countDetail.accountEntryCount}
          redirectUrl="/accountEntry"
        />

      </div>
    </div>
  );
};

export default AccountDashboard;
