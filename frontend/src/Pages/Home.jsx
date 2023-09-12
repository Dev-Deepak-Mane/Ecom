import React from "react";
import MetaData from "../Layouts/MetaData";
import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import backgroundBanner from "../Assests/Images/banner-02.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Flex, Heading, Text } from "@chakra-ui/react";
const Home = () => {
  return (
    <>
      <MetaData title={"ले-Lo"} />
      <Button as={Link} to={"/dashboard"}>
        click me
      </Button>
      {/* <ScrollableBox />

<Sliders /> */}

      <Box>
        <Sliders />
        {/* Hero Section */}

        {/* Promotions Section */}
        <Box bg="gray.100" p={4}>
          <Flex justify="center" align="center">
            <Text fontSize="lg" mr={2}>
              Get 20% off on all orders with code: SUMMER20
            </Text>
            <Button colorScheme="teal" size="sm">
              Shop Now
            </Button>
          </Flex>
        </Box>

        {/* Featured Categories */}
        <Box p={4}>
          <Heading size="lg" mb={4}>
            Explore Our Categories
          </Heading>
          <Flex flexWrap="wrap" justify="center">
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgSFhUYGRgaGR4ZGhgZHBkYGRgYGBoZHBocGBocJS4lHB4rHxgcJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHjUrJCsxNDQ+MTQ3NDQ0NTY0NDQ0NDYxNDY0NDQ0NDc9NDc1NDQ0NDQ0NDQ0NDQ2NDQxNDQ0NP/AABEIALUBFwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xABSEAACAQIDAgkGCAkJBwUAAAABAgADEQQSIQUxBhMiQVFhcYGRMlKSobHRFBUjQlNywdIHM1RigrKzwvAWJENjc4OT0/E0VWSi4eLjF0RFhJT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAYF/8QALxEAAgIBAgQFAgUFAAAAAAAAAAECEQMhMQQSE5EFQVFhcRUyFCIzUrEjQlOBof/aAAwDAQACEQMRAD8A12IicB7UREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEExDSSJbF+3BSsCVzpcG29vuzPS4F4ltzU+9mH7s2nENZ27Zb7Kqzr6MTzb8Tz3uuxop4AYrzqPpt9yfDwAxfTR9NvuTqFYMV5BAPWLg9U8YXjN75Oxb6dWsr0ok/U8/quxy9+AmLXU8V3O33ZAxHBuunlZO5j7p1vadbKjEbwpPgJomJe3FnOTxlDjGBOa7ZlFxcm2jSywxZV+KZ/VdjTsbhWptke17K2huLOoYeoiR5ccKR/OCP6ul+xSU85ZKpNI9Bgm544ylu0mIiJU2EREAREQBERAEREAREQBERAEREAREQBERAEREAREQQIiJIsQ26IbdBEtjpmMPyjdv2Sw2Y+srtofjG7R7JI2a+s73seLlubTTbSeyZHoNpMzGUJK3avKRkva4Iv0XFr+uc9pbHal8o1RTZMgX5wBa+nKNgCD6U3nbTHI+XflNubWxt65odJawX5U621sQbnumkI2m7KuTT2IfC0fzpx+ZS/YpKWXnDH/bH7Kf7JJRzhn9z+T1/Cfox+F/AiIlDoEREAREQBERAEREAREQBERAEREAREQBERAEREAl4bDKyO5vdTYDm3XvKWrVa+8zcODuCWpRxLMxVaaNUOUAk5EBtrumkrUzAEix5x0T6mKMORUtaPIcZnz9eScnV6Kz4zt5zeJkvZW0BSd2dOMuhVQ/KVWJBzWbS4AI75DuAQSLjnBuAfDWTMRggaK11NIXYjIjuzj64a+W1u8G8tyq9EcryyrWT7sxpWZ3VVOUsQtr8kFmt4aj+LCSMaxp5xdXyXF1N1bLfyTpppMWzME9VxTQqGy5wWYIABz5j/rPe1cK1NXpvbMoINiGG7pEuoRadpdguIywkuWTX+2b1w6xvFWPH8TdwM9s1+Re3kt27uaagvCFgbrtMAfU/wDHNz2/hsPimtVRmTy1DZkNwAt7KQ3Od/TKBuC+A+jYfpVvfOei73IicL667tqg/oD/AC4fhviToNoj0U+1JlPBbAeY3pVPfPJ4L4HzT6VT3xQIzcKqzDlbRB/Rpj9ySNj7TaozK2JWryL5bKCLEC/JUaa28I/kxgehvTqSRs/ZGGovnpZgxBUklyMtwfnafNhIGfhn/tlTsT9kko5ccLKwbF1WXdyRqLeSiA7+sSnnDP7mev4ZVhj8IREShuIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIYNk4PNbCY+35M/rUCaJS5z1ze+Di3wuPH/AAtX1IDNCpc/bPp4ftXwjxvGfrS+WfTMbie2MkYWijK7NUCuozIjJdXsLkZ78k93fNHqzlbokfFbpRTFBkKObWV7uh1IzjmvlO6+7WfMZhSMO75k0zLkzWfQb8vRrbukUVCUUE6AsFXoB5RJ7S3qMy423FtbzDft13eqaLYh7qzeeHGNxFIBsOnGNmAYZWeysgN8q67wNZpp23tE/wDtWP8AcVfsM6TtU/KHsX9RZkwDTlvQ3a1OaDbG0vyNj/8AXr++DtjaPPg2/wDz1/fO2YY6T5it0rzMUjh3x3jxvw1v7mt75cbC2niKjMtWmEUKCDkdLtmGl2JvpebjtK0qc12HbLp2RRA4Wn+e4j649SIPslPOsbR4P4d6ru2GzMzXZ85AJsNSM49Q5pibgphPoB6dT785JYm23Z97F4pihBRaeiS7HLIm8cIMDgsKUzYV3zkgBHfTKF33f86SMHsPB1ESoKDDOqsAXqXGYZgDZ98joyNPq2H0Zz+J0FuD2E0IoNqL+XU+/PDbAwn0X/PU5v05PRkT9Ww+j7GgxN1xuxsMtN2WlZgjEHO5sQDY2zWOvTNKEzlBx3OrhuKhnTcU9PURESh1CIiAIiIAiIgCIiAIiIAiIgCIiAbbwHo8YuJpD59GogHSWVQPbOc4Y3W+4np+2bnsOvUSnUaizK9zYrqbZAT3WF+6apU3z6uKP5U/Y8Xxcv6817swvumK0yPJGzUos/y7uiAXsgu7nmUGxC9ZP+lmjnPuC2e7o9RQMqWuT5zblHSbA/wYx9MrTe45j6hr7f4tPuHxz0y6UajqjmxF7Fl+bmtuNtDaecUxNNvqn7T9s0VV7lXd+x1Da55Z7F/VWeMA+s97Z8s9i/qLIuFfWcvkdD3Nowz6T5i30kbDVNJ8xT6ShJRbReVqHlDtkzHvIFM8odsuiDoGMw1Uu5XFql2NkK0yFHMAdD43nnD0aqurPikdQeUoVFBFjz799t0kYp7Ow65ENdmbi0XO/OL2RAdxd7HLfmABY8wtrM7Jo9bSwtGqeWVbKdPIO/ITvB51HhMKoigBSLAWAuLADqHZzSBtbbOGw5y4nHAON9OioJHUygO47SV7BKb+V2AY5Ria6E7i6vbvzKQB4SQbE7DmIta2+V6q4IUsCi3y6WbntmN9bA23CeBi7qKiOtVDuenYkdykh+6x/NM+lwQGBuDuI1BECjFj3+Tf6jewzRJueP8AIcfmn2TVEwTnQLc9AK39sxywlJppNn2PDM2PHF88kra3dEeJK+AVLE5DYbzdbDt1nx8DUXyktfdcqL+uZ9Kfo+x9P8Zw/wDkXdEaJI+BPbNkOXzri3je3OPGeBhn82+l7AhjYC5Ngb7pDxzW8X2JXF8O3Smr+TFERKHSIiIAiZMRRZGyurK3msCp8DMcMqpJq0egh6D4GMh80+Bm+bBxFqKC/wA0Sz+FjpnWuGtXZ8Wfi8oya5V3OYZT0HwnkzpjYsDdPY2gDJ/C+5X6xL9q7nL846R4z4XXzh4idUTFXkhK8fhvcfWJft/6c0wOIUUns4BzczAHybaTX6zjpHqnbhXj4TOqMuWKjWx8bK+fK5+rujhLMOkeInhQCQMwFza5OmvT0TvBxM9pXhspRxHB4MOlV+MRXpAHIWALgFs+TXUrYG3Pfx9V8TS+DuuUFzezZ7BVtuCg8o36Z3A1RPPGyVKiHG3ua3teujvdHVhZblSGF8o6JDwzazPtpr4hz/Vp7XkPDnWZPQ03L7DPpGKfSR8O+k+Yl9JmWKfGNrIlM8odomfFNrIqHlDtEuiDoG16rB2VLZ3fIt9QCbksRzhVBa3Pa3PNH4ZcKWpk7OwrlAv4+uDyyzWLKrDXMb8phrfQWsZte2cUEr1qh/oqTuP0ixP7EeJnDXqFhnY3Z2Z2PSxOp8bnvlKLWXWw8HxzmlSCIbFi75ibDeTkBJJ6ADz9F5gxlM03Zc4cA7xex7jr6pj2NiBTqI5AIBuQwDrcjeVOjWvfXokzbhDvnGpOrECwJ5uq8jzBFwGPei/GUTl89PmOOcEdPXzc033ZeNFRVqoDkfyha+R+e/foe485vzUaa9V5tvAaqVetR5tHA6CDlPqK+AlnsQjbEoh2WmdzsFPYxAPtk3aGCo4RhVfEVEZtxC5ibab9w065Co11purt5KMGb6qkMfVNgbhlgyLEm3OCpImuNzrRNo5uIWNtczSflZqTbVw4U0xWxBUtmIy0wC3TvmLE7Uw9RgXfEtYAAkU9AN3PNnfb+zTvpoe2kD9k8pt/Zq7qSDspD3ToU8i/tZxvDharnKXZz4aqBh0rYkBj5GVSLm28Lew0HVp1TYMLwTRHRxUqXRgwFlsbcx05909Lwzwi6LcDqWw8NJ4fh3hhuVz2KPvSsnleyo0hDho1buttzSOF2BFHFVEUWVgrqBuAYa26swaUs2DhbtdMS6OiMtlygsAGfUmwAvff088xbO4K4utbLRKA/OqcgeB5R7hPlZINSaPbcJxWN8PGc3Srz86KSJ0XZ/4N1tetWJPRTAUDva5PgIjpSEvE8CdW+xvOJwaVFyOiuvQwDDwM1jaPADDPqmekfzTde9Wv6iJt8+zpaT3R57Hmnjf5W0cUeu9Jmohr8W7JfdfIxW9ubdPPxk/TMO12+Xrf21T9o8gXnZGlFHPJtttlodoN0zJT2k0pmJE+cZLaMobbhdojpk74eOmaTTrHmmZa7SriibNwO0R0zyMeOmaqtYzMjNIpImzZRjx0zKmM65rSMZJRz0yKRBf4jahQA5Gff5OXS1tTmI6ZXVeFSj+hqdvIt+tI1R+SO1vYkra2EZ9zZT7YjBvUOSRmxW2A7moEe7Koy6XGXNz3/O9UkYYOy8YiC3QWCm/QRzGVuA2JiM1yAo85tB6tZs+zadVeXdDluDZdTc28o+VMp0jSNs8YOjiW0FBR1s9h4hTFTDYphmFGnbrqsN393L2ntgAWZfAW8ZFxjvVQqmlrZSDl1tbW46zMbaeqpGiSezNKx+IqJ5SU+6oT+5K5NqG45Caa+X/2S1xuwGNw5fOT81lIAHTpK1ODiKbsWbt0nTCEZbMxlJxJe2OGYqNWJoheNpmmQKl8t8+t8gv5fqmnDAE075tFJ101vbS3b7ZtybMoqb8Uveb3mDa1GmtFmTQgqQttNXXQ9UmWKMURGbbNSwwYnkrma27mHXbnPVLhcCzHdyrG9xoTrcZidTMWysbRDE3yFjqrAlD9VgCQOojvl38MoKAXqKLa2QEk6Ea2HXMOU1s134Mc41uAeV0BV1O/qE2PgIhapXrHdYKO1mzEdwA8ZSV6r4h+JooQOcnQkdLkeSvPb2mbjsjB8UgpoxyjyjpynO8/xusB0yHtQ87LrZ9mrJcXBdbg6ggED7JuRwtP6NPRX3TTdk/jqY/PE3e8mL0IkrIz4WmP6NPRX3SNheLfVUQrznKDZtDYEDKd+tjPO3cQyIWVMwym+gPpX3ra9+6QuDeI5ABQIDygubyVe3F7/Kzcrn5ppenuZOLUltRc/B0G5F9ET1xY6B4CezPkpZrSM2zqKks+VcwOUNYXAtewPRc7pZWkPZvkn632LJsqSIiIAiIgHCtqAcfX/tqv7R5gUCXGKp0zUqlkJJrVbm76/Kv0aSJxKF/xbBN3z9Tzm/8AG6a86S1I5bIbZbbpEcSzwNFG4wujWDkIoziyAC19NSd+vPeSEwVM2+Tcd72k9RIjlbKRGmdKglt8XUN2R/Fz9k+HZ1PmR/SYDvNpLyxRHIyuSoJIWsJP+LqA5n8WP7sxDBU92Sp4mwHhrIeSIUJEfjZkWrJL4BADYOTzDXX1Ty+HS4ASoek7gOoaamOpFDlkWexcLxoIuNLnX9CWLbDIlThNo0cMeWzqrXC3Ba5GUncNB2yzThdhbaOzc1gjX9ftmcuIcdmT0ebVozUtmMp0APj9kmpgmO9R65VpwzGYgYLEMg3MGoi/XlLeGvhLjD8JKLKGZHTpV8lx3qxHrmE+ITdto1jhaVKz2mzekD7Zl+Lh/ru8J6o7apv5IcjpsLdxJ1mLFbdpp5SVAOnKCPG9hMpZbVt6F1jryMeKwA3kDuEoMalNHCm5F9bdEuG4QUSL5alvqX9hMqtq7fosj00Dq5RgrZCtmsbHN9ommLMrpMrkxaXRX47CvVLLRoVcnzTlbvN7dPMDIWM4M11QZEd2z0yRkbSzoSb7rAC5kzE4YigxFarmsGV+NclrAnptyjbQTnmP2xiBUcfCa4AdgAKtTQBiNOVOucq0OLDkWTZNfJvWO4GK7Fmwrox3tS8knsHP2rI68CATrSxLdRBT15V9s1DDbdcIwfEYwvrkKYh1Uck2zAkk8q3deRfjvE/lNf8Axan3pkdJ1DC8HqiLkSgyJ0Kpue1unxPXJfxTWAsKL26lM5MNv4r8pr/4r/enZ+D9OouAStSzVq70ka1Z2dSxyk2zNyRZjuI3CKFlfs2my4imrKVOfcwIO48xm5yu2NWxT5/hVClTyhchTKSSSc17O1tLdG+WBMlIFZt8IaRzqrKLNyjYXBHeDa+vjpK7Z21GqVRkKrSFlKNlDAlMwtqLgaDS9r7psNamrgowBB0IIvKTCbBC4h65yi5BVQAVC2tax3HQay6klGq1MZQk5Xemncv2nm8+sZ5MobE7Znkn6x9gk2Q9m+R+kZMkAREQBERAOK4qp8rWF2/H1t39q88K/wBb1yFtDaVNa9dWqICK9YEMwBHyr7xeYPjej9JSP6Y+9LElsjdGb1ifQ7dL+J98qRtaj9JS9NfvT022KI/pKfpr74sFwjHpbxmUVT1+P/WUY21R+kpemvvnsbao81Sl6a++LRBdcb1+v/rPvG9frlS+1UXe6C/SbeExfHlL6al6a++NBqXXG/xeelqHo/jwlJ8eUfp6fpLPnx3S+nT0kHti0NTJwkrqBTLW3t7F3C2sp02pqFRbk7hax8JbVKKYkKRUzKjG5RgdSF0JXd0ywwGFw9IWVFHX7zMJYeaVtmkZuKojbOweJqb2Wmvi3cJs2B2ZTQhrZ385zmPdzCQRtFB89R2kD7ZnpbXor5VVB2uvvlXhitkW5292XyDVRpckDXUbxvngPvUndoZV0tuYfjE+Xp2zr89fOHXMGI2zRWo4NVMpdrEuBcZjYjpEdMnmMuP2chuVujdK6ercZSXqo4DlXTW97hrAHf09ssH25h9Rx1Ptzr75X4naNJ7qtVCxBAsyk3I6jI6MXq0Q5vyL3EbTpshIXOrrYG18pWzaqTmUKCNwtyhracf2qfl639q/67TpOE4PVyFYOguoBIduVvtyVFyB2805ltW4xFZTvFVwe0O15ThMTx2vJ7F8/S5Vy3damCJ4BgvOs5j2TO+cHOVgMMt7XpUt3UqHoPRPz8XneODD/wAzwo/qqf7NJKIZsYa7s53lQtgRoA173sDzz3brPiZFpOL/AMW3jpkrOOkeMMI+27fEx/G8z5nHSPGeS6+cPESCQSOvxMWE8F185fETy1dQPKHjALjZvkd59smSHs0fJr13PcSSPVJkAREQBERAIpwVMm5poSdSSqkk9J0j4BS+ip+gvukqIBF+L6X0VP0V90rk2MiPUdKCNxjBiDlADBQtwMp1IAv9US7iAVPwT/haPiv3Jiq7OVvKwWHb62Q+1JdxANcfYlM//HYQ+h/lzOMMwFhgqHR5aj9yXkQCkFGp+RUPTX/LnzY+wqdJGDIjM9R6jEhWsajFsoJUaAWG4bpeRAKvE7Bw1Sxeght1W9lpHbgpgzvwyev3y8iAaxR4CYFSzcQGzG9nZ2C9Sgnkia3s7gQlIOtfAJiSajMjqyKFpk8lLOynTv37zOlxANC/knhf9yr6dH78+Hgphv8Aco/xKP35v0QDnzcE8MQQNjKDbQl6RAPNcCpe0wbN/BvTTA8W1KmcYFYrVUkcvMWQM3Raykgbr2nSIgHJqXBXbKOHWph9BbKajlDc3N1yam8ocT+CnaLu9RmwuZ2Zms773JY/M6TO7RISS0RLbe5whPwTY4Xv8GbtqVRbssgnj/0gx/n4b06n3J3uJJBwRvwPY/mqYX06n3J0TY3BzEU6NOk4p3RFUlXYglVUXF1Ft03eIBQUNk1MwLlcvPYknu0kzA4DKDxioxJ0yjQKN3lc++WcQDB8ETzE9Ee6fRh08xfATNEAw/B08xfASuTZRzuzOCh1RFUqy+dmfMcwvusq265bxAPFNQAANwFh2Ce4iAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIB/9k="
                alt="Category 1"
              />
              <Box p={4}>
                <Heading size="md">Electronics</Heading>
                <Text color="gray.500">Shop Now</Text>
              </Box>
            </Box>
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzw79y6lEOXvNwGTeIIp5ui8n8JT96y6nOUw&usqp=CAU"
                alt="Category 2"
              />
              <Box p={4}>
                <Heading size="md">Education</Heading>
                <Text color="gray.500">Shop Now</Text>
              </Box>
            </Box>
            <Box
              maxW="xs"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              cursor="pointer"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0WMxMMQbAmWfRWKeSlWllmkFSqAjCw2UXA&usqp=CAU"
                alt="Category 3"
              />
              <Box p={4}>
                <Heading size="md">Fashion</Heading>
                <Text color="gray.500">Shop Now</Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        {/* Scrollable Box */}
        <ScrollableBox />

        {/* Slider Section */}
        <Box p={4} mt={8}>
          <Heading size="lg" mb={4}>
            Featured Products
          </Heading>
        </Box>
      </Box>
    </>
  );
};

const Sliders = () => {
  const carouselHeight = 430; // Desired height for the carousel

  return (
    <>
      <Box m="auto" height={`${carouselHeight}px`} overflow="hidden">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <Box>
            <Image
              src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-Uber-HP-Desktop-HeroBanner5-18May2023.gif"
              alt="Image 1"
              height={`${carouselHeight}px`}
            />
          </Box>
          <Box>
            <Image
              src="https://d64lkarmo2mrq.cloudfront.net/img/home/brandbanner1.webp"
              alt="Image 2"
              height={`${carouselHeight}px`}
            />
          </Box>
          <Box>
            <Image
              src="https://d64lkarmo2mrq.cloudfront.net/img/home/buy-one-get-one-free.webp"
              alt="Image 3"
              height={`${carouselHeight}px`}
            />
          </Box>
          <Box>
            <Image
              src="https://d64lkarmo2mrq.cloudfront.net/img/home/flash-sale-new-banner.webp"
              alt="Image 4"
              height={`${carouselHeight}px`}
            />
          </Box>
        </Carousel>
      </Box>
    </>
  );
};
const ScrollableBox = () => {
  return (
    // <Box
    //   border="solid"
    //   h={{ base: "500px", md: "700px" }}
    //   backgroundImage={backgroundBanner}
    //   backgroundAttachment="fixed"
    //   backgroundSize="cover"
    //   backgroundRepeat="no-repeat"
    // >
    //   {/* Content inside the box */}
    // </Box>

    <Box
      border="solid"
      h={"560px"}
      backgroundImage={backgroundBanner}
      backgroundAttachment="fixed"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      display="flex"
      justifyContent={{ base: "center", md: "flex-start" }}
      alignItems="center"
      padding="2rem"
      color={"black"}
    >
      <Flex
        direction="column"
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
          Hurry Up!
        </Heading>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mt="1rem"
        >
          Deal of the Day!
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} mt="1rem">
          Buy This T-shirt At 20% Discount, Use Code Off20
        </Text>
        <Button colorScheme="blue" size="lg" mt="1rem">
          SHOP NOW
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
