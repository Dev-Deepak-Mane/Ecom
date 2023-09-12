import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { AllProducts, getProducts } from "../Redux/Products/action";
import ProductCard from "../Components/Products/ProductCard";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import {
  Box,
  Grid,
  Stack,
  createStandaloneToast,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Heading,
  Menu,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import Pagination from "react-js-pagination";
import Page404NotFound from "../Layouts/Page404NotFound";
import { StarIcon } from "@chakra-ui/icons";
import MetaData from "../Layouts/MetaData";

const Products = () => {
  let { products, loading, productsCount, resultPerPage } =
    useSelector(AllProducts);

  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.getAll("page")[0] || 1);
  const [price, setPrice] = useState([
    Number(searchParams.getAll("price[gte]")[0]) > 0
      ? Number(searchParams.getAll("price[gte]")[0]) / 300
      : 0,
    Number(searchParams.getAll("price[lte]")[0]) < 30000
      ? Number(searchParams.getAll("price[lte]")[0]) / 300
      : 100,
  ]);
  // console.log(
  //   Number(searchParams.getAll("price[lte]")[0]) < 30000
  //     ? Number(searchParams.getAll("price[lte]")[0]) / 300
  //     : 100
  // );

  // below value for ratings start with zero
  const [ratings, setRatings] = useState(searchParams.get("ratings[gte]") || 0);
  const [showTooltip, setShowTooltip] = React.useState(true);
  const [category, setCategory] = useState(
    searchParams.getAll("category") || []
  );
  const [order, setOrder] = useState(searchParams.get("order") || "");

  // const search = useLocation().search;
  // const x = new URLSearchParams(search).toString();
  // console.log(search, x);
  const labelStyles = {
    mt: "6",
    ml: "-15px",
    fontSize: "md",
  };
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();

  const setPageNo = (e) => {
    setPage(e);
  };
  if (products?.length && order && order === "asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (order && order === "desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  } else {
    products = [...products];
  }
  useEffect(() => {
    let params = {};
    if (!param.query) {
      params.keyword = "";
      params.resultPerPage = products?.length;
      page && (params.page = page);
      params["price[gte]"] = price[0] * 300;
      params["price[lte]"] = price[1] * 300;
      params.category = category;
      params.order = order;
      params["ratings[gte]"] = ratings;
      setSearchParams(params);
    } else if (params.resultPerPage === 0 || params.resultPerPage < 6) {
      params.keyword = "";
      params.resultPerPage = products?.length;
      page && (params.page = 1);
      params.category = category;
      params["price[gte]"] = price[0] * 300;
      params["price[lte]"] = price[1] * 300;
      params.order = order;
      params["ratings[gte]"] = ratings;
      setSearchParams(params);
    } else {
      params = {};
      params.category = category;
      page && (params.page = 1);
      params["price[gte]"] = price[0] * 300;
      params.order = order;
      params["price[lte]"] = price[1] * 300;
      params["ratings[gte]"] = ratings;
      setSearchParams(params);
    }
  }, [
    setSearchParams,
    param.query,
    page,
    price[0],
    price[1],
    products?.length,
    category,
    order,
    ratings,
  ]);

  useEffect(() => {
    let filterParams = {
      params: {
        keyword: searchParams.getAll("keyword")[0] || "",
        page: searchParams.getAll("page")[0] || 1,
        "price[gte]": Number(searchParams.getAll("price[gte]")[0]) || 0,
        "price[lte]": Number(searchParams.getAll("price[lte]")[0]) || 30000,
      },
    };
    dispatch(getProducts(toast, filterParams, param.query, category, ratings));
  }, [
    dispatch,
    param.query,
    searchParams.getAll("page")[0],
    searchParams.getAll("price[lte]")[0],
    searchParams.getAll("price[gte]")[0],
    category,
    ratings,
  ]);

  return (
    <>
      <MetaData title="Products" />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {products && products?.length ? (
            <>
              <Stack
                direction={["column", "column", "row"]}
                spacing="24px"
                justifyContent={"flex-end"}
              >
                <Box
                  h="400px"
                  w={["auto", "auto", "25%"]}
                  className="filterBox"
                >
                  <Box p={6} m="10px auto" maxW="90%">
                    <Heading mb="40px">Price</Heading>
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[price[0], price[1]]}
                      onChangeEnd={(val) => setPrice(val)}
                    >
                      <RangeSliderTrack bg="red.100">
                        <RangeSliderFilledTrack bg="blue.500" />
                      </RangeSliderTrack>
                      <RangeSliderMark value={price[0]} {...labelStyles}>
                        0
                      </RangeSliderMark>
                      <RangeSliderMark value={price[1]} {...labelStyles}>
                        Max
                      </RangeSliderMark>
                      <Tooltip
                        hasArrow
                        bg="blue.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={(price[0] * 300).toString()}
                      >
                        <RangeSliderThumb boxSize={5} index={0}>
                          <Box color="blue.500" as={BiCaretLeft} />
                        </RangeSliderThumb>
                      </Tooltip>
                      <Tooltip
                        hasArrow
                        bg="blue.500"
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={price[1] * 300}
                      >
                        <RangeSliderThumb boxSize={5} index={1}>
                          <Box color="blue.500" as={BiCaretRight} />
                        </RangeSliderThumb>
                      </Tooltip>
                    </RangeSlider>

                    <Box mt={"20px"} p={2}>
                      <Heading mb="40px">Ratings</Heading>
                      <Slider
                        min={0}
                        max={5}
                        value={ratings}
                        onChange={(val) => setRatings(val)}
                      >
                        <SliderMark value={0}>0</SliderMark>
                        <SliderMark value={5}>5</SliderMark>

                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg="blue.500"
                          color="white"
                          placement="top"
                          isOpen={showTooltip}
                          label={`${ratings}`}
                        >
                          <SliderThumb boxSize={4}>
                            <Box
                              color="blue.500"
                              borderRadius={"100%"}
                              as={StarIcon}
                            />
                          </SliderThumb>
                        </Tooltip>
                      </Slider>
                    </Box>
                  </Box>
                  <Box
                    position="sticky"
                    bgColor={"white"}
                    minWidth={["90vw", "90vw", "1vw"]}
                    zIndex={2}
                    objectFit={"contain"}
                    m="50px 0 0 30px"
                  >
                    <Menu
                      closeOnSelect={false}
                      placement="bottom"
                      isOpen
                      isLazy
                    >
                      <MenuList
                        minWidth={["90vw", "90vw", "20vw", "20vw"]}
                        border={"none"}
                      >
                        <MenuOptionGroup
                          title="Order"
                          as={Heading}
                          fontWeight={"bold"}
                          type="radio"
                          onChange={(v) => setOrder(v)}
                          defaultValue={order.toString()}
                        >
                          <MenuItemOption value="asc">Ascending</MenuItemOption>
                          <MenuItemOption value="desc">
                            Descending
                          </MenuItemOption>
                        </MenuOptionGroup>
                        <MenuDivider />
                        <MenuOptionGroup
                          title="Category"
                          type="checkbox"
                          as={Heading}
                          fontWeight={"bold"}
                          value={category}
                          onChange={(v) => setCategory(v)}
                        >
                          <MenuItemOption
                            isChecked={category.includes("toy")}
                            value={"toy"}
                          >
                            Toy
                          </MenuItemOption>
                          <MenuItemOption
                            value="electronics"
                            isChecked={category.includes("electronics")}
                          >
                            Electronics
                          </MenuItemOption>
                          <MenuItemOption
                            value="cloth"
                            isChecked={category.includes("cloth")}
                          >
                            Cloth
                          </MenuItemOption>
                          <MenuItemOption
                            value="education"
                            isChecked={category.includes("education")}
                          >
                            Education
                          </MenuItemOption>
                          <MenuItemOption
                            value="accessories"
                            isChecked={category.includes("accessories")}
                          >
                            Accessories
                          </MenuItemOption>
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Box>
                </Box>

                <Grid
                  minHeight={"100vh"}
                  className="productBox"
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  gap={"40px"}
                  p="30px"
                  pt={["400px", "400px", "70px", "70px"]}
                >
                  {products?.map((product) => (
                    <Link to={`/product/${product?._id}`} key={product?._id}>
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </Grid>
              </Stack>
            </>
          ) : (
            <Box>
              <Page404NotFound return={"/products"} />
            </Box>
          )}
        </>
      )}

      {products && products?.length ? (
        <Box className="paginationBox">
          <Pagination
            activePage={Number(page)}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setPageNo}
            nextPageText="Next"
            prevPageText={"Previous"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Products;
