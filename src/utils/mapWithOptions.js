
export default function mapWithOptions(options, component) {
    try {
        return options?.map(optionProps => component(optionProps))
    } catch (error) {
        console.error({ error });
        return <div>
            Something Went Wrong!
        </div>
    }
}
