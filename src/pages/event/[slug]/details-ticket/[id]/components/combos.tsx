import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import AddCombosForm from "./AddCombosForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useCart from "@/store/useCart";
import { DataDisco } from "@/services/getDisco";
import { ShoppingCart, X } from "lucide-react";

const Combos = ({ discoData }: { discoData: DataDisco }) => {
  const discoId = discoData?.id;
  const discoColors = discoData?.discoDetail?.discoColor;
  const { data, isLoading } = useGetCombosByDiscoId(discoId);

  const { addToCart, cartItems, removeFromCart } = useCart();

  const addToCartHandler = (combo: any) => {
    if (!combo) {
      return;
    }
    const existItem = cartItems.find((item) => item.id === combo?.id);
    const quantity = existItem ? Number(existItem.quantity) + 1 : 1;

    if (Number(combo.countInStock) < quantity) {
      return;
    }

    return addToCart({ ...combo, quantity });
  };

  if (!discoColors || !data) {
    return;
  }

  return (
    <div className="lg:w-1/2">
      {data &&
        data.map((combo) => (
          <div
            style={{ background: `${discoColors.bgNavbarColor}60` }}
            key={combo.id}
            className="rounded-3xl overflow-hidden shadow-md flex flex-col items-center md:flex-row gap-8 p-8 relative"
          >
            <div>
              <div
                style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}90` }}
                className="absolute left-4 top-4 flex justify-center items-center h-8 w-8 rounded-full font-semibold"
              >
                <div>{cartItems.find((com) => com.id == combo.id)?.quantity ?? 0}</div>
              </div>
              <div className="flex justify-center">
                <p
                  style={{ color: discoColors.bgNavbarColor, background: discoColors.navbarForeground }}
                  className="px-4 py-1 rounded-full text-xl"
                >
                  {combo.category}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p style={{ color: discoColors.navbarForeground }} className="font-semibold">
                    <span>Price:</span> <span className="font-bold">${combo.price}</span>
                  </p>
                  <p style={{ color: discoColors.navbarForeground }}>
                    <span>Quantity available: </span>
                    {Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                      ? Number(combo.countInStock) - Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                      : Number(combo.countInStock)}
                  </p>
                </div>

                <p style={{ color: discoColors.navbarForeground }} className="py-2 text-xs leading-none">
                  {combo.comboDetail.description}
                </p>

                <div
                  style={{ background: `${discoColors.bgNavbarColor}` }}
                  className="flex items-center gap-8 p-4 rounded-xl shadow-md"
                >
                  <div>
                    <p className="text-xs md:text-base" style={{ color: discoColors.navbarForeground }}>
                      Reserved quantity: {cartItems.find((com) => com.id == combo.id)?.quantity ?? 0}
                    </p>
                    <p className="text-xs md:text-lg font-semibold" style={{ color: discoColors.navbarForeground }}>
                      Total:{" "}
                      <span>${(cartItems.find((com) => com.id == combo.id)?.quantity ?? 0) * Number(combo.price)}</span>
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p style={{ color: discoColors.navbarForeground }} className="text-xs font-semibold">
                      Add combos
                    </p>
                    <div className="flex  gap-4">
                      <Button
                        onClick={() => addToCartHandler(combo)}
                        style={{ color: discoColors.bgNavbarColor, background: discoColors.navbarForeground }}
                        className="text-xs px-3 h-8"
                      >
                        Add <ShoppingCart height={15} />
                      </Button>

                      {cartItems.find((com) => com.id == combo.id) && (
                        <button
                          type="button"
                          onClick={() => removeFromCart(combo)}
                          style={{ color: discoColors.navbarForeground }}
                        >
                          <X />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Image
              className="object-cover rounded-3xl shadow-md"
              src={combo.comboDetail.image}
              alt="combo image"
              height={200}
              width={200}
            />
          </div>
        ))}

      <div className="mt-8">
        <AddCombosForm discoId={discoId} />
      </div>
    </div>
  );
};

export default Combos;
