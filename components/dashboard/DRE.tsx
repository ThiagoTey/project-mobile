import { View } from "react-native";
import React from "react";
import ThemedText from "../typography/ThemedText";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ChartTitle from "../charts/ChartTitle";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import fonts from "@/constants/fonts";

type renderProps = {
  icon: "equals" | "plus" | "minus";
  title: string;
  value: number;
  highlighted?: boolean;
  color?: string;
};

const RenderItem = ({
  icon,
  title,
  value,
  color,
  highlighted,
}: renderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 12,
          width: "60%",
        }}
      >
        <FontAwesome6
          name={icon}
          size={16}
          color={highlighted ? Colors.blue : "gray"}
        />
        <ThemedText
          style={highlighted ? styles.highlightedText : styles.itemText}
        >
          {title}
        </ThemedText>
      </View>
      <ThemedText
        style={[
          highlighted ? styles.highlightedText : styles.itemText,
          { fontSize: 14 },
        ]}
      >
        R$ {value}
      </ThemedText>
    </View>
  );
};

const DRE = () => {
  return (
    <View style={{ rowGap: 8 }}>
      <ChartTitle iconName="redenvelopes" title="Demonstrativo do Mês" />
      <RenderItem icon="plus" title="Receita Bruta" value={132314.64} />
      <RenderItem icon="minus" title="Impostos" value={2432.79} />
      <RenderItem
        icon="equals"
        highlighted
        title="Receita Líquida"
        value={129881.88}
      />

      <View style={styles.line} />

      <RenderItem
        icon="minus"
        title="Custo de Mercadoria Vendida"
        value={5000.88}
      />
      <RenderItem
        icon="equals"
        highlighted
        title="Lucro Bruto"
        value={129881.88}
      />

      <View style={styles.line} />

      <RenderItem icon="minus" title="Despesas" value={129881.88} />
      <RenderItem icon="minus" title="Inevestimentos" value={129881.88} />
      <RenderItem
        icon="equals"
        highlighted
        title="Resultado antes do IR/CSLL"
        value={129881.88}
      />

      <View style={styles.line} />

      <RenderItem
        icon="minus"
        title="Provisões do IRPJ/CSLL"
        value={129881.88}
      />
      <RenderItem
        icon="equals"
        highlighted
        title="Resultado Líquido"
        value={129881.88}
      />
    </View>
  );
};

export default DRE;

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    flexWrap: "wrap",
    color: Colors.gray,
  },
  highlightedText: {
    fontSize: 16,
    fontFamily: fonts.interMedium,
    flexWrap: "wrap",
    color: Colors.blue,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "gray",
    opacity: 0.25,
    borderRadius: 4,
  },
});
