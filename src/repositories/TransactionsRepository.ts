import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /**
     * Tive que ver no fórum essa parte, mais problemas com a sintaxe
     * do que com a lógica
     */
    const balance = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          acc.outcome += transaction.value;
        }
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const arrTransaction = {
      title,
      value,
      type,
    };
    const transaction = new Transaction(arrTransaction);
    // preciso colocar dentro de um indice isso aaa
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
