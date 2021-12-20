import { Header } from "../../components/Header";
import { ModalAddEditFood } from "../../components/ModalAddEditFood";
import { Food } from "../../components/Food";
import api from "../../services/api";
import { FoodType } from "../../types";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function Dashboard() {
    const [foodList, setFoodList] = useState<FoodType[]>([]);
    const [editingFood, setEditingFood] = useState<FoodType>();
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetch() {
            const response = await api.get("/foods");
            setFoodList(response.data);
        }
        fetch();
    }, []);

    async function handleAddFood(food: FoodType) {
        try {
            const response = await api.post("/foods", {
                ...food,
                available: true,
            });

            setFoodList([...foodList, response.data]);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleUpdateFood(food: FoodType) {
        if (editingFood === undefined) {
            return;
        }

        try {
            const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
                ...editingFood,
                ...food,
            });

            const foodsUpdated = foodList.map((f) =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data
            );

            setFoodList(foodsUpdated);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteFood(id: FoodType["id"]) {
        await api.delete(`/foods/${id}`);
        const foodsFiltered = foodList.filter((food) => food.id !== id);
        setFoodList(foodsFiltered);
    }

    function toggleAddModal() {
        setAddModalIsOpen(!addModalIsOpen);
    }

    function toggleEditModal() {
        setEditModalIsOpen(!editModalIsOpen);
    }

    function handleEditFood(food: FoodType) {
        setEditingFood(food);
        setEditModalIsOpen(true);
    }

    return (
        <>
            <Header openModal={toggleAddModal} />
            <ModalAddEditFood
                isOpen={addModalIsOpen}
                toggleIsOpen={toggleAddModal}
                handleSubmit={handleAddFood}
            />
            <ModalAddEditFood
                isOpen={editModalIsOpen}
                toggleIsOpen={toggleEditModal}
                initialFoodData={editingFood}
                handleSubmit={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foodList &&
                    foodList.map((food) => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
}

const FoodsContainer = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: -140px auto 0;
    padding: 40px 24px;

    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 32px;
`;
