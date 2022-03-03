#ifndef VEC4_HPP
#define VEC4_HPP

#include <array>
#include <cmath>
#include <limits>

class Vec4
{
    // Not appropriate because
    //  const Vec4 b(3);
    //  b.v()[0] = 4;
    // compiles but should not for my usage
    // std::array<std::float_t, 4> v_;

public:
    std::float_t v_[4]; // NOLINT

    constexpr inline auto w() const { return v_[0]; }
    constexpr inline auto x() const { return v_[1]; }
    constexpr inline auto y() const { return v_[2]; }
    constexpr inline auto z() const { return v_[3]; }

    ~Vec4() = default;

    // constexpr explicit Vec4(std::array<std::float_t, 4> v)
    //     : v_{v[0], v[1], v[2], v[3]} {}

    constexpr explicit Vec4(std::float_t r) : Vec4(r, r, r, r) {}

    constexpr Vec4(std::float_t w, const Vec4 &v)
        : Vec4(w, v.x(), v.y(), v.z()) {}

    constexpr Vec4(std::float_t w, std::float_t r) : Vec4(w, r, r, r) {}

    constexpr Vec4(std::float_t x, std::float_t y, std::float_t z)
        : Vec4(0, x, y, z) {}

    constexpr Vec4(std::float_t w, std::float_t x, std::float_t y,
                   std::float_t z)
        : v_{w, x, y, z} {}

    constexpr Vec4(const Vec4 &v) = default;

    constexpr Vec4(Vec4 &&v) = default;

    constexpr Vec4 &operator=(const Vec4 &v) = default;

    constexpr Vec4 &operator=(Vec4 &&v) = default;

    bool operator==(const Vec4 &v) const
    {
        const auto e = std::numeric_limits<float_t>::epsilon();
        return std::fabs(w() - v.w()) < e && std::fabs(x() - v.x()) < e &&
               std::fabs(y() - v.y()) < e && std::fabs(z() - v.z()) < e;
    }
};

#endif /* VEC4_HPP */

