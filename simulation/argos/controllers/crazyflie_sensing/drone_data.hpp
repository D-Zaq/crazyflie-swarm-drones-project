
#include "Vec4.hpp"
#include <cmath>
#include <string>

class DroneData
{
private:
    bool flying_;
    std::string name_;
    std::float_t speed_;
    std::float_t battery_;
    Vec4 pos_;

public:
    explicit DroneData(std::string name);

    std::string encode();

    const std::string &get_name() const { return name_; }

    void update(std::float_t battery, const Vec4 &pos);

    bool isFlying() const { return flying_; }

    void setPosition(Vec4 pos) { pos_ = pos; };

    void setBattery(std::float_t battery) { battery_ = battery; };

    void enable();

    void disable();
};

