import { View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ThemedText from "@/components/typography/ThemedText";
import { useDbOperations } from "@/database/dbOperations";
import { useRefresh } from "@/context/RefreshContext";
import { useConfigDatabase } from "@/database/useConfigDatabase";

type Props = {};

const User = (props: Props) => {
  const { getLastSyncDate } = useConfigDatabase();
  const { allCompanies, userCompany } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [lastAsyncDate, setlastAsyncDate] = useState("");
  const [lastAsyncTime, setlastAsyncTime] = useState("");
  const { refresh } = useRefresh();

  useEffect(() => {
    if (allCompanies && userCompany) {
      const companyName = allCompanies.find(
        (company) => company.id === Number(userCompany)
      )?.name;
      if (companyName) {
        setCompanyName(companyName);
      }
    }
  }, [userCompany]);

  useEffect(() => {
    const getLastAsyncDate = async () => {
      try {
        const response = await getLastSyncDate();
        if (response) {
          const date = new Date(response.last_sync);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Formato 24h
          });
          setlastAsyncDate(formattedDate);
          setlastAsyncTime(formattedTime);
        }
      } catch (error) {
        throw error;
      }
    };
    getLastAsyncDate();
  }, [refresh]);

  return (
    <SafeAreaView>
      <View className="px-6 mt-4" style={{ rowGap: 12 }}>
        <ThemedText>Empresa : {companyName}</ThemedText>
        <ThemedText>
          Última sincronização : {lastAsyncDate ? lastAsyncDate : "Não sincr."}{" "}
          {lastAsyncTime ? lastAsyncTime : ""}
        </ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default User;
