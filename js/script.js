function initializeReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(

                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }

                );

            },

            {
                threshold: .08
            }

        );


    elements.forEach(

        element => {

            /*
                Only now hide it briefly
                for the animation.
            */

            element.classList.add(
                "animate-ready"
            );

            observer.observe(
                element
            );

        }

    );

}
