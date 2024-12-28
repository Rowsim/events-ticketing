
export default async function EventView({ params }: { params: Promise<{ eventId: string }> }) {
    const id = (await params).eventId


    return (
        <p>Event :: {id}</p>
    );
}
