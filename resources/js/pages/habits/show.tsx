import Header from "@/layouts/partials/Header"

function HabitDetails({ habit }) {
    return (
        <div className="container">
            <Header />
            <main>
                <h1 className="text-2xl font-bold">
                    {habit.name}
                </h1>
            </main>
        </div>
    )
}

export default HabitDetails
