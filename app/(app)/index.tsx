import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    <Redirect href="/(app)/(tabs)/home" />
  )
};

export default index;
