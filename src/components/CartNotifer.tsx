import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartNotifier = () => {
  useEffect(() => {
    const handleAdd = (e: any) => toast.success(`✅ ${e.detail} ditambahkan ke keranjang`);
    const handleIncrease = (e: any) => toast.info(`🔼 ${e.detail} jumlah ditambah`);
    const handleDecrease = (e: any) => toast.warning(`🔽 ${e.detail} jumlah dikurangi`);
    const handleDelete = (e: any) => toast.error(`🗑️ ${e.detail} dihapus dari keranjang`);

    window.addEventListener("cart:add", handleAdd);
    window.addEventListener("cart:increase", handleIncrease);
    window.addEventListener("cart:decrease", handleDecrease);
    window.addEventListener("cart:delete", handleDelete);

    return () => {
      window.removeEventListener("cart:add", handleAdd);
      window.removeEventListener("cart:increase", handleIncrease);
      window.removeEventListener("cart:decrease", handleDecrease);
      window.removeEventListener("cart:delete", handleDelete);
    };
  }, []);

  return null;
};

export default CartNotifier;
