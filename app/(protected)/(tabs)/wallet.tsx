import BalanceCard from "@/components/wallet/BalanceCard";
import { Ionicons } from "@expo/vector-icons";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function WalletScreen() {
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const transactions = useSelector(
    (state: RootState) => state.wallet.transactions
  );

  const quickActions = [
    { id: 1, icon: "arrow-up-circle", title: "Withdraw", color: "#10B981" },
    { id: 2, icon: "add-circle", title: "Deposit", color: "#6366F1" },
    { id: 3, icon: "repeat", title: "Transfer", color: "#F59E0B" },
    { id: 4, icon: "receipt", title: "History", color: "#EF4444" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BalanceCard balance={balance} />

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionButton}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: `${action.color}15` },
                ]}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {transactions
            .slice(0, 5)
            .map(
              (transaction: {
                id: Key | null | undefined;
                type: string;
                description:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                date:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                amount:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <View
                      style={[
                        styles.transactionIcon,
                        {
                          backgroundColor:
                            transaction.type === "credit"
                              ? "#ECFDF5"
                              : "#FEF2F2",
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          transaction.type === "credit"
                            ? "arrow-down"
                            : "arrow-up"
                        }
                        size={20}
                        color={
                          transaction.type === "credit" ? "#10B981" : "#EF4444"
                        }
                      />
                    </View>
                    <View>
                      <Text style={styles.transactionTitle}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {transaction.date}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      {
                        color:
                          transaction.type === "credit" ? "#10B981" : "#EF4444",
                      },
                    ]}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {transaction.amount}
                  </Text>
                </View>
              )
            )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 40,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  seeAll: {
    color: "#6366F1",
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    color: "#4B5563",
  },
  transactionsList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  transactionDate: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
});
