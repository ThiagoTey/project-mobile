import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    <Redirect href="/(app)/(tabs)/products" />
  )
};

export default index;
