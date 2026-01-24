import { RootState } from "@/app/store/rootReducer";
import {
  fetchWallet,
  fetchWalletTransactions,
} from "@/app/store/wallet/wallet.thunk";
import BalanceCard from "@/components/wallet/BalanceCard";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const WalletScreen = () => {
  const dispatch = useDispatch<any>();

  const { wallet, transactions, loading } = useSelector(
    (state: RootState) => state.wallet
  );
  useEffect(() => {
    dispatch(fetchWallet());
    dispatch(fetchWalletTransactions());
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading wallet...</Text>
      </View>
    );
  }

  if (!wallet) {
    return (
      <View style={styles.center}>
        <Text>No wallet data</Text>
      </View>
    );
  }

  const quickActions = [
    { id: 1, icon: "arrow-up-circle", title: "Withdraw", color: "#10B981" },
    { id: 2, icon: "add-circle", title: "Deposit", color: "#6366F1" },
    { id: 3, icon: "repeat", title: "Transfer", color: "#F59E0B" },
    { id: 4, icon: "receipt", title: "History", color: "#EF4444" },
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionMainTitle}>Wallet</Text>
      <View style={styles.content}>
        <BalanceCard
          totalBalance={wallet.totalEarnings}
          todayEarnings={wallet.todayEarnings}
          availableToWithdraw={wallet.availableToWithdraw}
        />

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
          <FlatList
            data={transactions.slice(0, 5)}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const isCredit = item.type === "QUIZ_REWARD";

              return (
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <View
                      style={[
                        styles.transactionIcon,
                        {
                          backgroundColor: isCredit ? "#ECFDF5" : "#FEF2F2",
                        },
                      ]}
                    >
                      <Ionicons
                        name={isCredit ? "arrow-down" : "arrow-up"}
                        size={20}
                        color={isCredit ? "#10B981" : "#EF4444"}
                      />
                    </View>

                    <View>
                      <Text style={styles.transactionTitle}>Quiz Reward</Text>
                      <Text style={styles.transactionDate}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: isCredit ? "#10B981" : "#EF4444" },
                    ]}
                  >
                    +${item.amount.toFixed(2)}
                  </Text>
                </View>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#F3F4F6",
                  marginVertical: 8,
                }}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

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
  sectionMainTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 24,
    marginBottom: 16,
    paddingLeft: 30,
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalletScreen;
