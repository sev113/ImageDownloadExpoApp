import {StyleSheet, View, Text} from "react-native";
import React from "react";
import {ScrollView} from "react-native";

const Divider = () => {
  return (
    <View style={{width: 1130}}>
      <Text
        style={{fontSize: 10, color: "rgba(0,0,0,0.5)"}}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </Text>
    </View>
  );
};

const TableColWidths = [35, 150, 75, 350, 75, 75, 150, 200];

const headerColumns = [
  "No.",
  "Name",
  "Center",
  "Class",
  "Enquiry",
  "Voucher",
  "Confirmed by",
  "Remark",
];

const TableHeader = () => {
  return (
    <>
      <View
        style={{flexDirection: "row", paddingHorizontal: 10, paddingTop: 10}}
      >
        {headerColumns.map((d, i) => (
          <View key={i} style={{width: TableColWidths[i]}}>
            <Text
              key={i}
              style={{
                color: "#000",
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

const TableData = ({data}) => {
  return (
    <>
      {data?.map((td, i) => (
        <View key={i}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View style={{width: TableColWidths[0]}}>
              <Text style={{paddingRight: 15}}>{td.no}</Text>
            </View>
            <View style={{width: TableColWidths[1]}}>
              <Text style={{paddingRight: 15}}>{td.name}</Text>
            </View>
            <View style={{width: TableColWidths[2]}}>
              <Text style={{paddingRight: 15}}>{td.center}</Text>
            </View>
            <View style={{width: TableColWidths[3]}}>
              <Text style={{paddingRight: 15}}>{td.class}</Text>
            </View>
            <View style={{width: TableColWidths[4]}}>
              <Text style={{textAlign: "right", paddingRight: 15}}>
                {td.payroll_for == "enquiry" ? td.amount : "-"}
              </Text>
            </View>
            <View style={{width: TableColWidths[5]}}>
              <Text style={{textAlign: "right", paddingRight: 15}}>
                {td.payroll_for == "voucher" ? td.amount : "-"}
              </Text>
            </View>
            <View style={{width: TableColWidths[6]}}>
              <Text style={{paddingRight: 15}}>{td.confirmed_by}</Text>
            </View>
            <View style={{width: TableColWidths[7]}}>
              <Text style={{}}>{td.remark}</Text>
            </View>
          </View>
          <Divider />
        </View>
      ))}
    </>
  );
};

const ExampleTable = ({tableData}) => {
  const enqTotal = tableData
    ?.filter((v) => v.payroll_for == "enquiry")
    .map((d) => d.amount)
    .reduce((prev, current, i) => prev + current, 0);
  const vrTotal = tableData
    ?.filter((v) => v.payroll_for == "voucher")
    .map((d) => d.amount)
    .reduce((prev, current, i) => prev + current, 0);

  return (
    <View style={styles.container}>
      {tableData?.length == 0 ? (
        <></>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.sub_card}>
            <View style={{flexDirection: "row"}}>
              <Text style={{flex: 0.4}}>Enquiry Total</Text>
              <Text style={{flex: 0.1}}>-</Text>
              <Text
                style={{
                  color: "#000",
                }}
              >
                {enqTotal}
              </Text>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={{flex: 0.4}}>Voucher Total</Text>
              <Text style={{flex: 0.1}}>-</Text>
              <Text
                style={{
                  color: "blue",
                }}
              >
                {vrTotal}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <ScrollView
              horizontal={true}
              bounces={false}
              style={{minHeight: 150}}
            >
              <View>
                <TableHeader />
                <Divider />
                <ScrollView>
                  <TableData data={tableData} />
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExampleTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "lightblue",
  },
  sub_card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    flex: 1,
  },
});
